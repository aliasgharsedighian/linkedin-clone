interface MessasingDataType {
  allMessages: any;
  allChats: any;
}

export const MessagingData: MessasingDataType = {
  allMessages: [
    {
      _id: "663ba0ea2199c61bd3fb30bcuser1",
      userId: "user_2ffnhf8RUYGmAFfDZVAhJ3vMVnL", // use findOneByIdAndUpdate method to see all chats for this user
      messageIndex: [
        {
          messageId: "663ba0ea2199c61bd3fb30bcMessageId1",
          users: [
            //search users chat by this
            {
              userId: "user_2fr23z9Iwvn5zGWyJkZtNTP5i8i",
              firstname: "Ali asghar1",
              lastname: "Sedighian1",
              profileImage:
                "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvdXBsb2FkZWQvaW1nXzJnODVpc2NxeVVNMDFyYU1acTdPaG1UQ0w4ayJ9",
              emailAddress: "aliasghar.sedighian444@gmail.com",
              extendData: {
                headline: "Frontend Developer22",
                currentPosition: "Rahyab Payam Gostaran22 Co",
                country: null,
                city: null,
              },
            },
          ],
          lastMessage: {
            userId: "user_2ffnhf8RUYGmAFfDZVAhJ3vMVnL",
            text: "this is a text with image test",
            fileOrImageUrl: "https://i.ibb.co/0Xbbbzz/OIG.jpg",
            updatedAt: "2024-05-08T15:55:10.569+00:00",
          },
        },
        {
          messageId: "663ba0ea2199c61bd3fb30bcMessageId2",
          users: [
            //search users chat by this
            {
              userId: "user_2g52KSQVEjcaSbzdpTJOsMJFER6",
              firstname: "peyman",
              lastname: "yousefian",
              profileImage:
                "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvdXBsb2FkZWQvaW1nXzJnOHAycld0Ym9UTnlKdkVjNW40bExTbkQ3eCJ9",
              emailAddress: "test@example.com",
              extendData: {
                headline: null,
                currentPosition: null,
                country: null,
                city: null,
              },
            },
          ],
          lastMessage: {
            userId: "user_2g52KSQVEjcaSbzdpTJOsMJFER6",
            text: "hello ali.i'm fine",
            fileOrImageUrl: null,
            updatedAt: "2024-05-08T15:57:10.569+00:00",
          },
        },
      ],
    },
  ],
  allChats: [
    {
      _id: "663ba0ea2199c61bd3fb30bcchatId1",
      messageId: "663ba0ea2199c61bd3fb30bcMessageId1", //this is slug for message(message_id), open chats by this
      users: [
        //search users chat by this
        {
          userId: "user_2fr23z9Iwvn5zGWyJkZtNTP5i8i",
          firstname: "Ali asghar1",
          lastname: "Sedighian1",
          profileImage:
            "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvdXBsb2FkZWQvaW1nXzJnODVpc2NxeVVNMDFyYU1acTdPaG1UQ0w4ayJ9",
          emailAddress: "aliasghar.sedighian444@gmail.com",
          extendData: {
            headline: "Frontend Developer22",
            currentPosition: "Rahyab Payam Gostaran22 Co",
            country: null,
            city: null,
          },
        },
      ],
      createdAt: "2024-05-08T15:57:30.629+00:00",
      updatedAt: "2024-09-05T11:53:21.875+00:00",
      chatsList: [
        {
          _id: "message_id1", //unique id for message to replay and forward message
          userInfo: {
            userId: "user_2ffnhf8RUYGmAFfDZVAhJ3vMVnL",
            firstname: "Ali asghar2",
            lastname: "Sedighian",
            profileImage:
              "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvdXBsb2FkZWQvaW1nXzJnR3VYbUhDSWFUWkRuaFNYaVhpU0k4WFR0MCJ9",
          },
          message: {
            text: "hello.how are you?",
            fileOrImageUrl: null,
          }, //this is message text && search keyword text with this
          reactions: ["userId"],
          createdAt: "2024-05-08T15:55:10.569+00:00",
          updatedAt: "2024-05-08T15:55:10.569+00:00",
        },
        {
          _id: "message_id2", //unique id for message to replay and forward message
          userInfo: {
            userId: "user_2fr23z9Iwvn5zGWyJkZtNTP5i8i",
            firstname: "Ali asghar1",
            lastname: "Sedighian1",
            profileImage:
              "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvdXBsb2FkZWQvaW1nXzJnR3VYbUhDSWFUWkRuaFNYaVhpU0k4WFR0MCJ9",
          },
          message: {
            text: "hello.i'm fine thanks",
            fileOrImageUrl: null,
          }, //this is message text && search keyword text with this
          reactions: ["userId"],
          createdAt: "2024-05-08T15:56:10.569+00:00",
          updatedAt: "2024-05-08T15:56:10.569+00:00",
        },
        {
          _id: "message_id3", //unique id for message to replay and forward message
          userInfo: {
            userId: "user_2ffnhf8RUYGmAFfDZVAhJ3vMVnL",
            firstname: "Ali asghar1",
            lastname: "Sedighian1",
            profileImage:
              "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvdXBsb2FkZWQvaW1nXzJnR3VYbUhDSWFUWkRuaFNYaVhpU0k4WFR0MCJ9",
          },
          message: {
            text: "this is a text with image test",
            fileOrImageUrl: "https://i.ibb.co/0Xbbbzz/OIG.jpg",
          }, //this is message text && search keyword text with this
          reactions: ["userId"],
          createdAt: "2024-05-08T15:57:10.569+00:00",
          updatedAt: "2024-05-08T15:57:10.569+00:00",
        },
      ],
    },
    {
      _id: "663ba0ea2199c61bd3fb30bcchatId2",
      messageId: "663ba0ea2199c61bd3fb30bcMessageId2", //this is slug for message(message_id), open chats by this
      users: [
        //search users chat by this
        {
          userId: "user_2g52KSQVEjcaSbzdpTJOsMJFER6",
          firstname: "peyman",
          lastname: "yousefian",
          profileImage:
            "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvdXBsb2FkZWQvaW1nXzJnOHAycld0Ym9UTnlKdkVjNW40bExTbkQ3eCJ9",
          emailAddress: "test@example.com",
          extendData: {
            headline: null,
            currentPosition: null,
            country: null,
            city: null,
          },
        },
      ],
      createdAt: "2024-05-08T15:57:30.629+00:00",
      updatedAt: "2024-09-05T11:53:21.875+00:00",
      chatsList: [
        {
          _id: "message_id12", //unique id for message to replay and forward message
          userInfo: {
            userId: "user_2ffnhf8RUYGmAFfDZVAhJ3vMVnL",
            firstname: "Ali asghar2",
            lastname: "Sedighian",
            profileImage:
              "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvdXBsb2FkZWQvaW1nXzJnR3VYbUhDSWFUWkRuaFNYaVhpU0k4WFR0MCJ9",
          },
          message: {
            text: "hello peyman.how are you?",
            fileOrImageUrl: null,
          }, //this is message text && search keyword text with this
          reactions: ["userId"],
          createdAt: "2024-05-08T15:55:10.569+00:00",
          updatedAt: "2024-05-08T15:55:10.569+00:00",
        },
        {
          _id: "message_id22", //unique id for message to replay and forward message
          userInfo: {
            userId: "user_2g52KSQVEjcaSbzdpTJOsMJFER6",
            firstname: "peyman",
            lastname: "yousefian",
            profileImage:
              "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvdXBsb2FkZWQvaW1nXzJnOHAycld0Ym9UTnlKdkVjNW40bExTbkQ3eCJ9",
          },
          message: {
            text: "this is a text with image test from peyman",
            fileOrImageUrl: "https://i.ibb.co/0Xbbbzz/OIG.jpg",
          }, //this is message text && search keyword text with this
          reactions: ["userId"],
          createdAt: "2024-05-08T15:56:10.569+00:00",
          updatedAt: "2024-05-08T15:56:10.569+00:00",
        },
        {
          _id: "message_id33", //unique id for message to replay and forward message
          userInfo: {
            userId: "user_2g52KSQVEjcaSbzdpTJOsMJFER6",
            firstname: "peyman",
            lastname: "yousefian",
            profileImage:
              "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvdXBsb2FkZWQvaW1nXzJnOHAycld0Ym9UTnlKdkVjNW40bExTbkQ3eCJ9",
          },
          message: {
            text: "hello ali.i'm fine",
            fileOrImageUrl: null,
          }, //this is message text && search keyword text with this
          reactions: ["userId"],
          createdAt: "2024-05-08T15:57:10.569+00:00",
          updatedAt: "2024-05-08T15:57:10.569+00:00",
        },
      ],
    },
  ],
};
