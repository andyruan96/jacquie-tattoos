'use client';

import {
  Button,
  Checkbox,
  CheckboxGroup,
  Select,
  SelectItem,
  Textarea,
} from '@nextui-org/react';
import { Input, DateInput } from '@nextui-org/react';
import { State, sendBookingForm } from '@/app/_lib/actions';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Image from 'next/image';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import clsx from 'clsx';
import { useCrash } from '@/app/_lib/use-crash';

export default function BookingForm() {
  const initialState: State = { message: '', errors: {} };
  const [state, setState] = useState(initialState);

  // checkbox group isInvalid doesn't play nice with server state validation
  const [availabilityInvalid, setAvailabilityInvalid] = useState(true);

  const [files, setFiles] = useState<FileList | null>(null);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  useEffect(() => {
    if (!files || !files.length) {
      setPreviewUrls([]);
      return;
    }

    const previewObjectUrls: string[] = [];
    for (let i = 0; i < files.length; i++) {
      previewObjectUrls.push(URL.createObjectURL(files.item(i) as File));
    }

    setPreviewUrls(previewObjectUrls);

    // free memory
    return () => {
      previewObjectUrls.forEach((previewObjectUrl) => {
        URL.revokeObjectURL(previewObjectUrl);
      });
    };
  }, [files]);

  function onSelectReferenceFiles(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || !e.target.files.length) {
      setFiles(null);
      return;
    }

    setFiles(e.target.files);
  }

  const { executeRecaptcha } = useGoogleReCaptcha();
  const crash = useCrash();
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    let token;
    if (executeRecaptcha) {
      token = await executeRecaptcha();
    }

    try {
      const res = await sendBookingForm(token ?? 'no token', state, formData);
      if (res.message) {
        setState(res);
      }
    } catch (e) {
      crash(e);
    }
  }

  return (
    <form
      id="booking-form"
      onSubmit={handleSubmit}
      noValidate // Handling all validation on server-side
    >
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <Input
          id="email"
          name="email"
          label="Email *"
          type="email"
          isInvalid={!!state.errors?.email}
          errorMessage="Please provide a valid email"
        />

        <div className="flex gap-2">
          <Input
            id="name"
            name="name"
            label="Name *"
            type="text"
            isInvalid={!!state.errors?.name}
            errorMessage="Please provide a name"
          />
          <Input
            id="preferredName"
            name="preferredName"
            label="Preferred Name"
            type="text"
          />
        </div>

        <Input
          id="pronoun"
          name="pronoun"
          label="Pronoun"
          type="text"
          className="my-2"
        />

        <Input
          id="instagram"
          name="instagram"
          type="text"
          label="Instagram Handle"
          description="Email will be how I contact you, but if for some reason I'm having trouble contacting you, I may try over IG. I will not use this for any personal reasons. Strictly business."
        />

        <Input
          id="phone"
          name="phone"
          label="Phone Number *"
          type="tel"
          isInvalid={!!state.errors?.phone}
          errorMessage="Please provide a phone number"
        />

        <DateInput
          id="dob"
          name="dob"
          label="Date of Birth *"
          className="mb-10"
          description="Must be 18+"
          isInvalid={!!state.errors?.dob}
          errorMessage={
            !!state.errors?.dob ? 'Please enter your date of birth' : null
          }
        />

        <Select
          id="type"
          name="type"
          label="Custom or Flash *"
          isInvalid={!!state.errors?.type}
          errorMessage="Please select a tattoo type"
        >
          <SelectItem value="Custom" key="Custom">
            Custom
          </SelectItem>
          <SelectItem value="Flash" key="Flash">
            Flash
          </SelectItem>
        </Select>

        <Textarea
          id="description"
          name="description"
          label="Design Description *"
          description="If you're looking to get flash, please give me the name of the flash
          *** I do not tattoo other people's art without permission (except big corp aka manga, tv screen caps etc). If you purchased a tattoo ticket, I need proof of purchase."
          isInvalid={!!state.errors?.description}
          errorMessage="If you're looking to get flash, please give me the name of the flash
          *** I do not tattoo other people's art without permission (except big corp aka manga, tv screen caps etc). If you purchased a tattoo ticket, I need proof of purchase."
        />

        <div className="my-2">
          <label className="mb-2 block text-base text-gray-500">
            Reference Pics
          </label>
          <input
            className={clsx(
              'w-full cursor-pointer rounded border bg-white text-sm font-semibold text-gray-400 file:mr-4 file:cursor-pointer file:border-0 file:bg-gray-100 file:px-4 file:py-3 file:text-gray-500 file:hover:bg-gray-200',
              { 'bg-red-100 text-red-500': !!state.errors?.file },
            )}
            id="file"
            name="file"
            type="file"
            accept="image/*"
            multiple
            onChange={onSelectReferenceFiles}
            aria-describedby="fileDescription fileError"
          />
          {!!state.errors?.file ? (
            <p id="fileDescription" className="mt-2 text-xs text-red-400">
              Please attach only files up to 5 MB in size.
            </p>
          ) : (
            <p id="fileDescription" className="mt-2 text-xs text-gray-400">
              Please attach 3-5 references for <b>custom</b> pieces.
            </p>
          )}

          <div className="flex gap-2">
            {previewUrls.map((previewUrl, index) => (
              <Image
                alt={`Selected Reference Picture ${index}`}
                width="0"
                height="0"
                src={previewUrl}
                key={`ref-${index}`}
                className="h-[100px] w-auto"
              />
            ))}
          </div>
        </div>

        <Input
          id="size"
          name="size"
          label="Size (In Inches) *"
          type="number"
          min="1"
          step="0.1"
          isInvalid={!!state.errors?.size}
          errorMessage="Please provide a tattoo size"
        />

        <Input
          id="placement"
          name="placement"
          label="Body Placement *"
          type="text"
          className="mb-10"
          isInvalid={!!state.errors?.placement}
          errorMessage="Please provide the tattoo's placement"
        />

        <CheckboxGroup
          id="availability"
          name="availability"
          label="Availability *"
          className="mb-3"
          description="First appointment starts at 10:30AM.
      Last appointment starts at 4PM.
      ALL APPOINTMENTS MUST FINISH BY 5 PM EXCEPT ON SUNDAYS & MONDAYS. I share a station with another artist"
          isInvalid={!!state.errors?.availability && availabilityInvalid}
          errorMessage="Please select your availability"
          onValueChange={(value) => {
            setAvailabilityInvalid(value.length < 1);
          }}
        >
          <Checkbox value="Sunday">Sunday</Checkbox>
          <Checkbox value="Monday">Monday</Checkbox>
          <Checkbox value="Wednesday">Wednesday</Checkbox>
          <Checkbox value="Thursday">Thursday</Checkbox>
          <Checkbox value="Friday">Friday</Checkbox>
        </CheckboxGroup>

        <Input
          id="time"
          name="time"
          label="Time Specification"
          type="text"
          description="If you're only available before or after a certain time on specific days, let me know. If nothing is written here, I'll assume you're available all day for the days you've selected above."
          className="mb-3"
        />

        <Input
          id="budget"
          name="budget"
          label="Budget *"
          type="text"
          description="I'll let you know if I think the idea you want will be over your budget. It's an estimate at best, but for custom pieces, sometimes it can take longer than I expect. "
          className="mb-10"
          isInvalid={!!state.errors?.budget}
          errorMessage="Please provide your budget"
        />

        <Select
          id="previousClient"
          name="previousClient"
          label="Have I tattooed you before *"
          isInvalid={!!state.errors?.previousClient}
          errorMessage="Please answer the above"
        >
          <SelectItem value="Yes" key="Yes">
            Yup
          </SelectItem>
          <SelectItem value="No" key="No">
            Nope, first time!
          </SelectItem>
        </Select>

        <div className="flex flex-col gap-2 md:flex-row">
          <Select
            id="medical1"
            name="medical1"
            label="Do you have any medical conditions or allergies? *"
            isInvalid={!!state.errors?.medical1}
            errorMessage="Please answer the above"
          >
            <SelectItem value="Yes" key="Yes">
              Yes
            </SelectItem>
            <SelectItem value="No" key="No">
              No
            </SelectItem>
          </Select>

          <Input
            id="medical2"
            name="medical2"
            label="If you answered yes to the previous question, please list your condition"
            type="text"
          />
        </div>

        <Textarea
          id="moreInfo"
          name="moreInfo"
          label="Anything else I should know about?"
        />
      </div>
      <div className="ml-6 flex gap-4">
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
}
