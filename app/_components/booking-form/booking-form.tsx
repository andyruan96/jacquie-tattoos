'use client';

import {
  Button,
  Checkbox,
  CheckboxGroup,
  Select,
  SelectItem,
  Textarea,
} from '@nextui-org/react';
import { useFormState } from 'react-dom';
import { Input, DateInput } from '@nextui-org/react';
import { State, sendBookingForm } from '@/app/_lib/actions';
import { useState } from 'react';

export default function BookingForm() {
  const initialState: State = { message: '', errors: {} };
  const [state, dispatch] = useFormState(sendBookingForm, initialState);

  // checkbox group isInvalid doesn't play nice with server state validation
  const [availabilityInvalid, setAvailabilityInvalid] = useState(true);

  return (
    <form
      id="booking-form"
      action={dispatch}
      aria-describedby="form-error"
      noValidate // Handling all validation on server-side
    >
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <Input
          id="email"
          name="email"
          // TODO: isRequired doesn't play nice with server state validation
          label="Email *"
          type="email"
          className="my-2"
          isInvalid={!!state.errors?.email}
          errorMessage="Please provide a valid email"
        />

        <div className="flex gap-2">
          <Input
            id="name"
            name="name"
            label="Name *"
            type="text"
            className="my-2"
            isInvalid={!!state.errors?.name}
            errorMessage="Please provide a name"
          />
          <Input
            id="preferredName"
            name="preferredName"
            label="Preferred Name"
            type="text"
            className="my-2"
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
          description="Email will be how I contact you, but if for some reason you're not answering, I may try to contact you over IG. I will not use this for any personal reasons. Strictly business."
        />

        <Input
          id="phone"
          name="phone"
          label="Phone Number *"
          type="tel"
          // pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
          className="my-2"
          isInvalid={!!state.errors?.phone}
          errorMessage="Please provide a phone number"
        />

        <DateInput
          id="dob"
          name="dob"
          label="Date of Birth *"
          className="my-2"
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
          className="my-2"
          isInvalid={!!state.errors?.type}
          errorMessage="Please select a tattoo type"
        >
          <SelectItem value="custom" key="custom">
            Custom
          </SelectItem>
          <SelectItem value="flash" key="flash">
            Flash
          </SelectItem>
        </Select>

        <Textarea
          id="description"
          name="description"
          label="Design Description *"
          description="If you're looking to get flash, please give me the name of the flash
          *** I do not tattoo other people's art without permission (except big corp aka manga, tv screen caps etc). If you purchased a tattoo ticket, I need proof of purchase."
          className="my-2"
          isInvalid={!!state.errors?.description}
        />

        <label htmlFor="file">Choose file to upload</label>
        <input type="file" id="file" name="file" multiple accept="image/*" />

        <Input
          id="size"
          name="size"
          label="Size (In Inches) *"
          type="number"
          min="1"
          step="0.1"
          className="my-2"
          isInvalid={!!state.errors?.size}
          errorMessage="Please provide a tattoo size"
        />

        <Input
          id="placement"
          name="placement"
          label="Body Placement *"
          type="text"
          className="my-2"
          isInvalid={!!state.errors?.placement}
          errorMessage="Please provide the body placement"
        />

        <CheckboxGroup
          id="availability"
          name="availability"
          label="Availability *"
          className="my-2"
          description="First appointment starts at 10:30AM
      Last appointment starts at 4PM
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
          className="my-2"
        />

        <Input
          id="budget"
          name="budget"
          label="Budget *"
          type="text"
          description="I'll let you know if I think the idea you want will be over your budget. It's an estimate at best, but for custom pieces, sometimes it can take longer than I expect. "
          className="my-2"
          isInvalid={!!state.errors?.budget}
          errorMessage="Please provide your budget"
        />

        <Select
          id="previousClient"
          name="previousClient"
          label="Have I tattooed you before *"
          className="my-2"
          isInvalid={!!state.errors?.previousClient}
          errorMessage="Please answer the above"
        >
          <SelectItem value="Yes" key="true">
            Yup
          </SelectItem>
          <SelectItem value="No" key="false">
            Nope, first time!
          </SelectItem>
        </Select>

        <div className="my-2 flex gap-2">
          <Select
            id="medical1"
            name="medical1"
            label="Do you have any medical conditions or allergies? *"
            isInvalid={!!state.errors?.medical1}
            errorMessage="Please answer the above"
          >
            <SelectItem value="Yes" key="true">
              Yes
            </SelectItem>
            <SelectItem value="No" key="false">
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
      <div className="mt-6 flex justify-end gap-4">
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
}
