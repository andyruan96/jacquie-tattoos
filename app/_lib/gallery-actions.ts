'use server';

type MediaType = 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';

export type GalleryItem = {
  id: string;
  src: string;
  permalink: string;
  type: MediaType;
  videoSrc?: string;
  caption: string;
};

export async function fetchIGFeed(): Promise<GalleryItem[]> {
  await refreshIGToken();

  const baseUrl = 'https://graph.instagram.com/me/media';
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

    const response = await res.json();
    if (!response || !response.data) {
      return [];
    }

    const ret = response.data.map((data: Record<string, string>) =>
      mapToGalleryItem(data),
    );
    return ret;
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

export async function fetchIGItem(
  mediaId: string,
): Promise<GalleryItem | null> {
  await refreshIGToken();

  const baseUrl = `https://graph.instagram.com/${mediaId}`;
  const params = new URLSearchParams();
  params.set(
    'fields',
    'id,caption,media_type,media_url,permalink,thumbnail_url',
  );
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
    if (!response) {
      return null;
    }

    const ret = mapToGalleryItem(response);
    return ret;
  } catch (e) {
    console.log('issue fetching ig item', e, mediaId);
    return null;
  }
}

export async function fetchIGCarouselAlbum(
  parentMediaId: string,
): Promise<GalleryItem[]> {
  await refreshIGToken();

  const baseUrl = `https://graph.instagram.com/${parentMediaId}/children`;
  const params = new URLSearchParams();
  params.set(
    'fields',
    'id,media_type,media_url,permalink,thumbnail_url', // "caption" field not available for children
  );
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
    if (!response || !response.data) {
      return [];
    }

    const ret = response.data.map((data: Record<string, string>) =>
      mapToGalleryItem(data),
    );
    return ret;
  } catch (e) {
    console.log('issue fetching ig carousel album', e, parentMediaId);
    return [];
  }
}

function mapToGalleryItem(igResponse: Record<string, string>): GalleryItem {
  return {
    src: igResponse['thumbnail_url'] ?? igResponse['media_url'],
    permalink: igResponse['permalink'],
    id: igResponse['id'],
    type: igResponse['media_type'] as MediaType,
    videoSrc: igResponse['thumbnail_url'] ? igResponse['media_url'] : undefined,
    caption: igResponse['caption'] ?? '',
  };
}
