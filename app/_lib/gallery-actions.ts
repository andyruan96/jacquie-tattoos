'use server';

export type GalleryItem = {
  id: string;
  src: string;
  permalink: string;
  videoSrc?: string;
};

export async function fetchIGFeed(): Promise<GalleryItem[]> {
  await refreshIGToken();

  const baseUrl = 'https://graph.instagram.com/me/media';
  // const query = `fields=id,caption,media_type,media_url,permalink,thumbnail_url`

  const params = new URLSearchParams();
  params.set(
    'fields',
    'id,caption,media_type,media_url,permalink,thumbnail_url',
  );
  params.set(
    'access_token',
    process.env.IG_BASIC_DISPLAY_API_ACCESS_TOKEN ?? '',
  );
  params.set('limit', '30');

  let res;
  try {
    const url = `${baseUrl}?${params.toString()}`;
    console.log('url', url);
    res = await fetch(url, {
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
    });

    // console.log('res', res);
    const response = await res.json();
    // console.log('response', response);

    if (!response || !response.data) {
      return [];
    }

    const ret: GalleryItem[] = response.data.map(
      (data: { [x: string]: string }) => ({
        src: data['thumbnail_url'] ?? data['media_url'],
        permalink: data['permalink'],
        id: data['id'],
        videoSrc: data['thumbnail_url'] ? data['media_url'] : undefined,
      }),
    );
    // console.log(ret);
    return ret;
    // map out the response to something well defined
  } catch (e) {
    console.log('issue fetching ig feed', e);
    return [];
  }
}

async function refreshIGToken() {
  const baseUrl = 'https://graph.instagram.com/refresh_access_token';
  const params = new URLSearchParams();
  params.set('grant_type', 'ig_refresh_token');
  params.set(
    'access_token',
    process.env.IG_BASIC_DISPLAY_API_ACCESS_TOKEN ?? '',
  );

  let res;
  try {
    const url = `${baseUrl}?${params.toString()}`;
    console.log('url', url);
    res = await fetch(url, {
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
    });

    const response = await res.json();

    if (response && response.expires_in > 0) {
      return true;
    }

    return false;
  } catch (e) {
    console.log('issue refreshing ig token', e);
    return false;
  }
}
