export interface UserInfoType {
  userId: string;
  id: string;
  emailAddress: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
  extendData: {
    headline: string;
    currentPosition: string;
    country: string | null;
    city: string | null;
  };
  following: [
    {
      emailAddress: string;
      userId: string;
      firstName: string;
      lastName: string;
      imageUrl: string;
    }
  ];
  token: string | undefined | null;
}
