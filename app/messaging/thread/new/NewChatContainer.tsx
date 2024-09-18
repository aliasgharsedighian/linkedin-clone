"use client";

import { useAppStore } from "@/store/store";
import SuggestedFriends from "./SuggestedFriends";
import SearchContacts from "./SearchContacts";
import NewMessageContainer from "./NewMessageContainer";

function NewChatContainer({ userInfo, userId }: any) {
  const { selectedChatType } = useAppStore();
  return (
    <>
      {selectedChatType === undefined ? (
        <>
          <SearchContacts userId={userId} />
          <SuggestedFriends userInfo={userInfo} />
        </>
      ) : (
        <NewMessageContainer userInfo={userInfo} />
      )}
    </>
  );
}

export default NewChatContainer;
