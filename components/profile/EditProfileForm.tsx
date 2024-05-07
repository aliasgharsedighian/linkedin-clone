"use client";

import React, { useEffect, useTransition, useState } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import updateProfileAction from "@/actions/updateProfileAction";

function EditProfileForm({
  id,
  setOpenDialog,
}: {
  id: string;
  setOpenDialog: any;
}) {
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
        setOpenDialog(false);
        toast.promise(promise, {
          loading: "Updating profile",
          success: "Profile updated",
          error: "Failed to update profile",
        });
      });
    } catch (error) {}
  };

  if (isPending) {
    return (
      <div className="min-h-[60dvh] flex items-center justify-center w-full">
        <div className="mr-2" role="status">
          <svg
            aria-hidden="true"
            className="w-14 h-14 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
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
            defaultValue={profileData?.extendData?.headline}
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
            defaultValue={profileData?.extendData?.currentPosition}
          />
        </div>
        <div className="flex justify-end">
          <Button
            type="submit"
            aria-disabled={isPendingEdit}
            disabled={isPendingEdit}
          >
            {isPendingEdit ? (
              <div className="flex items-center gap-2">
                <p>Saving ...</p>
                <div className="" role="status">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            ) : (
              "Save"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default EditProfileForm;
