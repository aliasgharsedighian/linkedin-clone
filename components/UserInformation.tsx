import { currentUser } from "@clerk/nextjs/server";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { IPostDocument } from "@/mongodb/models/Post";
import MobileUserInformationExpand from "./MobileUserInformationExpand";
import Link from "next/link";

async function UserInformation({ posts }: { posts: IPostDocument[] }) {
  const user = await currentUser();

  const firstName = user?.firstName;
  const lastName = user?.lastName;
  const imageUrl = user?.imageUrl;

  const userPosts = posts?.filter((post) => post.user.userId === user?.id);
  const userComments = posts.flatMap((post) =>
    post?.comments?.filter((comment) => comment.user.userId === user?.id || [])
  );

  return (
    <div className="flex flex-col justify-center items-center bg-white dark:bg-[var(--dark-post-background)] rounded-lg border dark:border-[var(--dark-border)] py-4">
      <Link
        className="flex flex-col justify-center items-center"
        href="/profile"
      >
        <Avatar>
          {user?.id ? (
            <AvatarImage src={imageUrl} />
          ) : (
            <AvatarImage src="https://github.com/shadcn.png" />
          )}

          <AvatarFallback>
            {firstName?.charAt(0)} {lastName?.charAt(0)}
          </AvatarFallback>
        </Avatar>

        <SignedIn>
          <div className="text-center dark:text-white">
            <p className="font-semibold">
              {firstName} {lastName}
            </p>

            <p className="text-xs">
              @{firstName}
              {lastName}-{user?.id.slice(-4)}
            </p>
          </div>
        </SignedIn>
      </Link>

      <SignedOut>
        <div className="text-center space-y-2">
          <p className="dark:text-white">You are not signed in</p>
          <Button asChild className="bg-[#0b63c4] text-white">
            <SignInButton>Sign in</SignInButton>
          </Button>
        </div>
      </SignedOut>
      <SignedIn>
        <div className="w-full hidden md:flex flex-col">
          <hr className="w-full border-gray-200 my-5 dark:border-[var(--dark-border)]" />

          <div className="flex justify-between w-full px-4 text-sm">
            <p className="font-semibold text-gray-400">Posts</p>
            <p className="text-blue-400">{userPosts.length}</p>
          </div>

          <div className="flex justify-between w-full px-4 text-sm">
            <p className="font-semibold text-gray-400">Comments</p>
            <p className="text-blue-400">{userComments.length}</p>
          </div>
        </div>
        <MobileUserInformationExpand
          userPosts={userPosts}
          userComments={userComments}
        />
      </SignedIn>
    </div>
  );
}

export default UserInformation;
