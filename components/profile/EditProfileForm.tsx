"use client";

import React, { useEffect, useTransition, useState } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import updateProfileAction from "@/actions/updateProfileAction";

function EditProfileForm({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();
  const [isPendingEdit, startTransitionEdit] = useTransition();
  const [profileData, setProfileData] = useState<any>();

  const getProfileInfo = async () => {
    startTransition(async () => {
      const response = await fetch(`/api/users/${id}`);
      const user = await response.json();
      setProfileData(user);
    });
  };
  useEffect(() => {
    getProfileInfo();
  }, []);

  const handleUpdateProfile = (formData: FormData) => {
    try {
      startTransitionEdit(async () => {
        const promise = updateProfileAction(id, formData);
        toast.promise(promise, {
          loading: "Updating profile",
          success: "Profile updated",
          error: "Failed to update profile",
        });
      });
    } catch (error) {}
  };

  if (isPending) {
    return <div>loading...</div>;
  }
  return (
    <div className="mx-4">
      <form
        className="flex flex-col gap-4"
        action={(formData) => handleUpdateProfile(formData)}
      >
        <div className="flex flex-col gap-1">
          <label className="text-sm" htmlFor="firstName-input">
            First name
          </label>
          <input
            className="text-sm outline-none border p-2 rounded-md"
            type="text"
            name="firstNameInput"
            id="firstName-input"
            placeholder="Enter your first name"
            defaultValue={profileData?.firstName}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm" htmlFor="lastName-input">
            Last name
          </label>
          <input
            className="text-sm outline-none border p-2 rounded-md"
            type="text"
            name="lastNameInput"
            id="lastName-input"
            placeholder="Enter your last name"
            defaultValue={profileData?.lastName}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm" htmlFor="headline-input">
            Profile headline
          </label>
          <input
            className="text-sm outline-none border p-2 rounded-md"
            type="text"
            name="headlineInput"
            id="headline-input"
            placeholder="Enter your headline"
            defaultValue={profileData?.headline}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm" htmlFor="current-position-input">
            Current position
          </label>
          <input
            className="text-sm outline-none border p-2 rounded-md"
            type="text"
            name="currentPositionInput"
            id="current-position-input"
            placeholder="Enter your current position"
            defaultValue={profileData?.currentPosition}
          />
        </div>
        <div className="flex justify-end">
          <Button type="submit">Save</Button>
        </div>
      </form>
    </div>
  );
}

export default EditProfileForm;
