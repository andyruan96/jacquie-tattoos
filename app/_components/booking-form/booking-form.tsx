'use client';

import {
  Button,
  Card,
  CardBody,
  Checkbox,
  CheckboxGroup,
  Select,
  SelectItem,
  Textarea,
} from '@nextui-org/react';
import { Input, DateInput } from '@nextui-org/react';
import { State, sendBookingForm } from '@/app/_lib/booking-form-actions';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Image from 'next/image';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import clsx from 'clsx';
import { useCrash } from '@/app/_lib/use-crash';
import { isRedirectError } from 'next/dist/client/components/redirect';
import LoadingSpinner from '@/app/_components/loading-spinner/loading-spinner';

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
  const [formSubmitted, setFormSubmitted] = useState(false);
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormSubmitted(true);
    const formData = new FormData(event.currentTarget);

    let token;
    if (executeRecaptcha) {
      token = await executeRecaptcha();
    }

    try {
      const res = await sendBookingForm(token ?? 'no token', state, formData);
      if (res && res.message) {
        setState(res);
        setFormSubmitted(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (e) {
      if (isRedirectError(e)) {
        // success allow redirect
        return;
      }
      // fail use error.tsx
      crash(e);
    }
  }

  return (
    <form
      id="booking-form"
      onSubmit={handleSubmit}
      noValidate // Handling all validation on server-side
    >
      <div className="rounded-lg bg-porsche p-4 md:p-6">
        <h5 className="mb-3 text-xl font-semibold text-ironstone">Personal</h5>
        <Input
          id="email"
          name="email"
          label="Email *"
          type="email"
          isInvalid={!!state.errors?.email}
          errorMessage="Please provide a valid email"
          classNames={{
            inputWrapper: ['shadow-md'],
            errorMessage: ['md:text-sm', 'text-red-700'],
          }}
        />

        <div className="flex gap-2">
          <Input
            id="name"
            name="name"
            label="Name *"
            type="text"
            isInvalid={!!state.errors?.name}
            errorMessage="Please provide a name"
            classNames={{
              inputWrapper: ['shadow-md'],
              errorMessage: ['md:text-sm', 'text-red-700'],
            }}
          />
          <Input
            id="preferredName"
            name="preferredName"
            label="Preferred Name"
            type="text"
            classNames={{
              inputWrapper: ['shadow-md'],
            }}
          />
        </div>

        <Input
          id="pronoun"
          name="pronoun"
          label="Pronoun"
          type="text"
          className="my-2"
          classNames={{
            inputWrapper: ['shadow-md'],
          }}
        />

        <Input
          id="instagram"
          name="instagram"
          type="text"
          label="Instagram Handle"
          description="Email will be how I contact you, but if for some reason I'm having trouble contacting you, I may try over IG. I will not use this for any personal reasons. Strictly business."
          classNames={{
            inputWrapper: ['shadow-md'],
            description: ['text-coconut-cream', 'md:text-sm'],
          }}
        />

        <Input
          id="phone"
          name="phone"
          label="Phone Number *"
          type="tel"
          isInvalid={!!state.errors?.phone}
          errorMessage="Please provide a phone number"
          classNames={{
            inputWrapper: ['shadow-md'],
            errorMessage: ['md:text-sm', 'text-red-700'],
          }}
        />

        <DateInput
          id="dob"
          name="dob"
          label="Date of Birth *"
          description="Must be 18+"
          isInvalid={!!state.errors?.dob}
          errorMessage={
            !!state.errors?.dob ? 'Please enter your date of birth' : null
          }
          classNames={{
            inputWrapper: ['shadow-md'],
            description: ['text-coconut-cream', 'md:text-sm'],
            errorMessage: ['md:text-sm', 'text-red-700'],
          }}
        />

        <h5 className="mb-3 mt-10 text-xl font-semibold text-ironstone">
          Tattoo Design
        </h5>
        <Select
          id="type"
          name="type"
          label="Custom or Flash *"
          isInvalid={!!state.errors?.type}
          errorMessage="Please select a tattoo type"
          classNames={{
            trigger: ['shadow-md'],
            errorMessage: ['md:text-sm', 'text-red-700'],
          }}
        >
          <SelectItem value="Custom" key="Custom">
            Custom ($180 hourly)
          </SelectItem>
          <SelectItem value="Flash" key="Flash">
            Flash (Flat rate, labelled on each piece)
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
          classNames={{
            inputWrapper: ['shadow-md'],
            description: ['text-coconut-cream', 'md:text-sm'],
            errorMessage: ['md:text-sm', 'text-red-700'],
          }}
        />

        <div className="my-2">
          <label className="mb-2 block text-base text-gray-500">
            Reference Pics
          </label>
          <input
            className={clsx(
              'w-full cursor-pointer rounded-lg border bg-white text-sm font-semibold text-gray-400 shadow-md file:mr-4 file:cursor-pointer file:border-0 file:bg-gray-100 file:px-4 file:py-3 file:text-gray-500 file:hover:bg-gray-200',
              { 'bg-red-200 text-red-500': !!state.errors?.file },
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
            <p
              id="fileDescription"
              className="mt-2 text-xs text-red-600 md:text-sm"
            >
              Please attach only files up to 5 MB in size. Max 5 files.
            </p>
          ) : (
            <p
              id="fileDescription"
              className="mt-2 text-xs text-coconut-cream md:text-sm"
            >
              Please attach 3-5 references for <b>custom</b> pieces. Up to 5 MB
              in size each.
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
          classNames={{
            inputWrapper: ['shadow-md'],
            errorMessage: ['md:text-sm', 'text-red-700'],
          }}
        />

        <Input
          id="placement"
          name="placement"
          label="Body Placement *"
          type="text"
          isInvalid={!!state.errors?.placement}
          errorMessage="Please provide the tattoo's placement"
          classNames={{
            inputWrapper: ['shadow-md'],
            errorMessage: ['md:text-sm', 'text-red-700'],
          }}
        />

        <h5 className="mb-3 mt-10 text-xl font-semibold text-ironstone">
          Scheduling & Cost
        </h5>
        <Card className="mb-3 bg-gray-100 shadow-md">
          <CardBody>
            <CheckboxGroup
              id="availability"
              name="availability"
              label="Availability *"
              description="First appointment starts at 10:30AM.
      Last appointment starts at 4PM.
      ALL APPOINTMENTS MUST FINISH BY 5 PM EXCEPT ON SUNDAYS & MONDAYS. I share a station with another artist."
              isInvalid={!!state.errors?.availability && availabilityInvalid}
              errorMessage="Please select your availability"
              onValueChange={(value) => {
                setAvailabilityInvalid(value.length < 1);
              }}
              classNames={{
                description: ['text-xs', 'md:text-sm'],
                errorMessage: ['text-xs', 'md:text-sm'],
              }}
            >
              <Checkbox value="Sunday">Sunday</Checkbox>
              <Checkbox value="Monday">Monday</Checkbox>
              <Checkbox value="Wednesday">Wednesday</Checkbox>
              <Checkbox value="Thursday">Thursday</Checkbox>
              <Checkbox value="Friday">Friday</Checkbox>
            </CheckboxGroup>
          </CardBody>
        </Card>

        <Input
          id="time"
          name="time"
          label="Time Specification"
          type="text"
          description="If you're only available before or after a certain time on specific days, let me know. If nothing is written here, I'll assume you're available all day for the days you've selected above."
          className="mb-3"
          classNames={{
            inputWrapper: ['shadow-md'],
            description: ['text-coconut-cream', 'md:text-sm'],
          }}
        />

        <Input
          id="budget"
          name="budget"
          label="Budget *"
          type="text"
          description="I'll let you know if I think the idea you want will be over your budget. It's an estimate at best, but for custom pieces, sometimes it can take longer than I expect. "
          isInvalid={!!state.errors?.budget}
          errorMessage="Please provide your budget"
          classNames={{
            inputWrapper: ['shadow-md'],
            description: ['text-coconut-cream', 'md:text-sm'],
            errorMessage: ['md:text-sm', 'text-red-700'],
          }}
        />

        <h5 className="mb-3 mt-10 text-xl font-semibold text-ironstone">
          Misc.
        </h5>
        <Select
          id="previousClient"
          name="previousClient"
          label="Have I tattooed you before *"
          isInvalid={!!state.errors?.previousClient}
          errorMessage="Please answer the above"
          classNames={{
            trigger: ['shadow-md'],
            errorMessage: ['md:text-sm', 'text-red-700'],
          }}
        >
          <SelectItem value="Yes" key="Yes">
            Yup
          </SelectItem>
          <SelectItem value="No" key="No">
            Nope, first time!
          </SelectItem>
        </Select>

        <div className="my-3 flex flex-col gap-3 xl:flex-row">
          <Select
            id="medical1"
            name="medical1"
            label="Do you have any medical conditions or allergies? *"
            isInvalid={!!state.errors?.medical1}
            errorMessage="Please answer the above"
            classNames={{
              trigger: ['shadow-md'],
              errorMessage: ['md:text-sm', 'text-red-700'],
            }}
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
            label="If you answered yes to the previous question, please list your condition here"
            type="text"
            classNames={{
              inputWrapper: ['shadow-md'],
            }}
          />
        </div>

        <Textarea
          id="moreInfo"
          name="moreInfo"
          label="Anything else I should know about?"
          classNames={{
            inputWrapper: ['shadow-md'],
          }}
        />

        <Button
          className="mt-3 bg-ironstone font-bold text-coconut-cream shadow-md"
          type="submit"
          isDisabled={formSubmitted}
        >
          Submit
          {formSubmitted && <LoadingSpinner sizeClass="text-xl" />}
        </Button>
      </div>
    </form>
  );
}
