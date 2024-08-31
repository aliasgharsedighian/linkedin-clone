import { NextResponse } from "next/server";
import { Users } from "@/mongodb/models/users";
import Fuse from "fuse.js";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  const { userId } = auth();

  try {
    const { searchInput } = await req.json();

    const fuseOptions = {
      // isCaseSensitive: false,
      // includeScore: true,
      shouldSort: true,
      // includeMatches: true,
      // findAllMatches: true,
      // matchAllTokens: true,
      minMatchCharLength: 1,
      // maxPatternLength: 32,
      // location: 0,
      threshold: 0.0,
      // distance: 100,
      // useExtendedSearch: false,
      // ignoreLocation: false,
      // ignoreFieldNorm: false,
      // fieldNormWeight: 1,
      keys: ["fullName", "emailAddress", "userId"],
    };

    const usersList = await Users.find();

    const userListWithFullName = usersList.map((item) => {
      return {
        fullName: `${item.firstName} ${item.lastName}`,
        emailAddress: item.emailAddress,
        userId: item.userId,
        imageUrl: item.imageUrl,
      };
    });

    const fuse = new Fuse(userListWithFullName, fuseOptions);

    const usersFindBySearchInput = fuse
      .search(searchInput)
      .filter((item) => item.refIndex !== 0 && item.item.userId !== userId);

    const dataSendToUser = usersFindBySearchInput.map((item) => {
      return {
        name: item.item.fullName,
        email: item.item.emailAddress,
        user_id: item.item.userId,
        image: item.item.imageUrl,
      };
    });

    if (dataSendToUser.length === 0) {
      return NextResponse.json({
        status: 200,
        message: "no search result",
        data: dataSendToUser,
      });
    }

    if (dataSendToUser.length > 0) {
      return NextResponse.json(
        {
          status: 200,
          message: "users found",
          data: dataSendToUser,
        },
        { status: 200 }
      );
    }
    // console.log(usersFindBySearchInput);
  } catch (error) {
    return NextResponse.json(
      {
        message: "can't connect to api",
      },
      { status: 500 }
    );
  }
}
