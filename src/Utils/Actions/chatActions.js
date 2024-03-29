import firebase from '@react-native-firebase/app';
import database from '@react-native-firebase/database';
import {addUserChats, deleteUserChats, getUserChats} from './userAction';
import {getUserPushTokens} from './authAction';
import moment from 'moment';

// const firebaseConfig = {
//   apiKey: 'AIzaSyBNtN5MtBImlPaMQQy2KoxuweE-Q2k7JJA',
//   authDomain: 'whatsapp-338b3.firebaseapp.com',
//   databaseURL: 'https://whatsapp-338b3-default-rtdb.firebaseio.com/',
//   projectId: 'whatsapp-338b3',
//   storageBucket: 'whatsapp-338b3.appspot.com',
//   messagingSenderId: '235752567381',
//   appId: '1:235752567381:web:ed2503883b2cc3539d9adc',
//   measurementId: 'G-ZCE7RLYPB7',
// };

// // Initialize Firebase
// if (!firebase.apps.length) {
//   const app = firebase.initializeApp(firebaseConfig);
// }

// export const createChat = async (
//   loggedInUserData,
//   chatData,
//   isGroupChat,
//   chatName,
// ) => {
//   try {
//     const newChatData2 = {
//       users: [...chatData],
//       createdBy: loggedInUserData,
//       updatedBy: loggedInUserData,
//       createdAt: new Date().toISOString(),
//       updatedAt: new Date().toISOString(),
//       isGroupChat: isGroupChat,
//       chatName: chatName,
//     };

//     const newChat = await database().ref('chats').push();

//     await newChat
//       .set(newChatData2)
//       .then(() => console.log('chat saved'))
//       .catch(() => console.log('chat not saved.'));

//     const chatUsers = newChatData2.users;

//     for (let i = 0; i < chatUsers.length; i++) {
//       const userId = chatUsers[i];
//       console.log('chatuserid', userId);
//       if (userId) {
//         const userChat = await database().ref(`userChat/${userId}`).push();

//         await userChat
//           .set(newChat.key)
//           .then(() => console.log('User Chat saved.'))
//           .catch(() => console.log('User Chat not saved.'));
//       }
//     }
//     return newChat.key;
//   } catch (error) {
//     throw error;
//   }
// };

export const sendTextMessage = async (chatId, senderData, messageText, card_id) => {
  try {
    await sendMessage(chatId, senderData, messageText, card_id);
  } catch (error) {
    console.log(error);
  }

  //   const otherUsers = chatUsers.filter(uid => uid !== senderData.userId);
  //   await sendPushNotificationForUsers(
  //     otherUsers,
  //     `${senderData.firstLast}`,
  //     messageText,
  //     chatId,
  //   );
};

export const sendLocationMessage = async (chatId, senderData, latitude, longitude, card_id) => {
  try {
    await sendPositionMessage(chatId, senderData, latitude, longitude, card_id);
  } catch (error) {
    console.log(error);
  }

  //   const otherUsers = chatUsers.filter(uid => uid !== senderData.userId);
  //   await sendPushNotificationForUsers(
  //     otherUsers,
  //     `${senderData.firstLast}`,
  //     messageText,
  //     chatId,
  //   );
};

// export const sendImgMessage = async (
//   chatId,
//   senderData,
//   imageUrl,
//   replyTo,
//   chatUsers,
// ) => {
//   sendMessage(chatId, senderData.userId, imageUrl, 'Image', replyTo, null);
//   const otherUsers = chatUsers.filter(uid => uid !== senderData.userId);
//   await sendPushNotificationForUsers(
//     otherUsers,
//     `${senderData.firstLast}`,
//     `${senderData.firstname} sends an image`,
//     chatId,
//   );
// };

// export const sendInfoMessage = async (chatId, senderId, messageText) => {
//   sendMessage(chatId, senderId, null, messageText, null, 'info');
// };

// export const updateChatData = async (chatId, userId, chatData) => {
//   const chatRef = database().ref(`chats/${chatId}`);
//   await chatRef.update({
//     ...chatData,
//     updatedAt: new Date().toISOString(),
//     updatedBy: userId,
//   });
// };

const sendPositionMessage = async (chatId, senderId, latitude, longitude, card_id) => {
  try {
    const messageData = {
      sentBy: senderId,
      // sentAt: new Date().toISOString(),
      sentAt: moment().format('YYYY-MM-DDTHH:mm:ss.SSSSSSZ'),
      lat: latitude,
      long: longitude,
      text: '',
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      card_id: card_id,
    };
    const messageRef = database()
      .ref(`messages/${chatId}/${card_id}/${senderId}`)
      .push(messageData)
      .then(res => console.log('userMsgSaved'))
      .catch(err => console.log('userMsgNotSaved'));
      
      const messageRef2 = database()
      .ref(`messages/${senderId}/${card_id}/${chatId}`)
      .push(messageData)
      .then(res => console.log('userMsgSaved'))
      .catch(err => console.log('userMsgNotSaved'));

    const chatRef = database().ref(`chats/${chatId}`);
    await chatRef.update({
      updatedBy: senderId,
      updatedAt: new Date().toISOString(),
      latestMessage: 'location',
      user: {RecieverId: chatId, senderId},
    });

    const latestRef = database().ref(`latest/${chatId}/${card_id}/${senderId}`);
    const latestRef2 = database().ref(`latest/${senderId}/${card_id}/${chatId}`);

        // Fetch latestRef current messageCount
    const currentMessageCountRef = latestRef.child('messageCount');
    const currentMessageCountSnapshot = await currentMessageCountRef.once('value');
    const currentMessageCount = currentMessageCountSnapshot.val() || 0;

        // Fetch latestRef2 current messageCount
    const currentMessageCountRef2 = latestRef2.child('messageCount');
    const currentMessageCountSnapshot2 = await currentMessageCountRef2.once('value');
    const currentMessageCount2 = currentMessageCountSnapshot2.val() || 0;

     // Increment messageCount
     const updatedMessageCount = currentMessageCount + 1;
     const updatedMessageCount2 = currentMessageCount2 + 1;

    await latestRef.update({
      text: 'Location',
      readFlag: false,
      sentBy: senderId,
      card_id: card_id,
      messageCount: updatedMessageCount,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      sentAt: moment().format('YYYY-MM-DDTHH:mm:ss.SSSSSSZ')
    });
    await latestRef2.update({
      text: 'Location',
      readFlag: true,
      sentBy: senderId,
      card_id: card_id,
      messageCount: 0,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      sentAt: moment().format('YYYY-MM-DDTHH:mm:ss.SSSSSSZ')
    });
    
    const userRef = database().ref(`users/${chatId}`);
    await userRef.update({
      latestMessage: 'Location',
    });
  } catch (error) {
    console.log(error);
  }
};

const sendMessage = async (chatId, senderId, messageText, card_id) => {
  try {
    const messageData = {
      sentBy: senderId,
      // sentAt: new Date().toISOString(),
      sentAt: moment().format('YYYY-MM-DDTHH:mm:ss.SSSSSSZ'),
      text: messageText,
      lat: '',
      long: '',
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      card_id: card_id,
    };
    const messageRef = database()
      .ref(`messages/${chatId}/${card_id}/${senderId}`)
      .push(messageData)
      .then(res => console.log('userMsgSaved'))
      .catch(err => console.log('userMsgNotSaved'));
      
      const messageRef2 = database()
      .ref(`messages/${senderId}/${card_id}/${chatId}`)
      .push(messageData)
      .then(res => console.log('userMsgSaved'))
      .catch(err => console.log('userMsgNotSaved'));

    const chatRef = database().ref(`chats/${chatId}`);
    await chatRef.update({
      updatedBy: senderId,
      updatedAt: new Date().toISOString(),
      latestMessage: messageText,
      user: {RecieverId: chatId, senderId},
    });

    const latestRef = database().ref(`latest/${chatId}/${card_id}/${senderId}`);
    const latestRef2 = database().ref(`latest/${senderId}/${card_id}/${chatId}`);

        // Fetch latestRef current messageCount
    const currentMessageCountRef = latestRef.child('messageCount');
    const currentMessageCountSnapshot = await currentMessageCountRef.once('value');
    const currentMessageCount = currentMessageCountSnapshot.val() || 0;

        // Fetch latestRef2 current messageCount
    const currentMessageCountRef2 = latestRef2.child('messageCount');
    const currentMessageCountSnapshot2 = await currentMessageCountRef2.once('value');
    const currentMessageCount2 = currentMessageCountSnapshot2.val() || 0;

     // Increment messageCount
     const updatedMessageCount = currentMessageCount + 1;
     const updatedMessageCount2 = currentMessageCount2 + 1;

    await latestRef.update({
      text: messageText,
      readFlag: false,
      sentBy: senderId,
      card_id: card_id,
      messageCount: updatedMessageCount,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      sentAt: moment().format('YYYY-MM-DDTHH:mm:ss.SSSSSSZ')
    });
    await latestRef2.update({
      text: messageText,
      readFlag: true,
      sentBy: senderId,
      card_id: card_id,
      messageCount: 0,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      sentAt: moment().format('YYYY-MM-DDTHH:mm:ss.SSSSSSZ')
    });
    
    const userRef = database().ref(`users/${chatId}`);
    await userRef.update({
      latestMessage: messageText,
    });
  } catch (error) {
    console.log(error);
  }
};

// export const starMessages = async (messageId, chatId, userId) => {
//   try {
//     const childRef = database().ref(
//       `userStarredMessages/${userId}/${chatId}/${messageId}`,
//     );
//     const snapshot = await childRef.once('value');
//     if (snapshot.exists()) {
//       // starred item exist - unstar
//       await childRef.remove();
//     } else {
//       // starred item does not exist - star
//       const starredMessageData = {
//         messageId,
//         chatId,
//         starredAt: new Date().toISOString(),
//       };
//       await childRef.set(starredMessageData);
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const RemoveUserFromChat = async (
//   userLoggedInData,
//   userToRemoveData,
//   chatData,
// ) => {
//   const userToRemoveId = userToRemoveData.userId;
//   const newUsers = chatData.users.filter(uid => uid !== userToRemoveId);
//   await updateChatData(chatData.key, userLoggedInData.userId, {
//     users: newUsers,
//   });

//   const userChats = await getUserChats(userToRemoveId);
//   for (const key in userChats) {
//     const currentChatId = userChats[key];
//     if (currentChatId === chatData.key) {
//       await deleteUserChats(userToRemoveId, key);
//       break;
//     }
//   }
//   const messageText =
//     userLoggedInData.userId === userToRemoveData.userId
//       ? `${userLoggedInData.firstname} left group`
//       : `${userLoggedInData.firstname} removed ${userToRemoveData.firstname} from group`;
//   sendInfoMessage(chatData.key, userLoggedInData.userId, messageText);
// };

// export const addUsersToChat = async (
//   userLoggedInData,
//   userToAddData,
//   chatData,
// ) => {
//   const existingUsers = Object.values(chatData.users);
//   const newUsers = [];
//   let userAddedName;
//   userToAddData.forEach(async userToAdd => {
//     const userToAddId = userToAdd.userId;
//     if (existingUsers.includes(userToAddId)) return;
//     newUsers.push(userToAddId);
//     await addUserChats(userToAddId, chatData.key);
//     userAddedName = `${userToAdd.firstLast}`;
//   });
//   if (newUsers.length === 0) return;
//   await updateChatData(chatData.key, userLoggedInData.userId, {
//     users: existingUsers.concat(newUsers),
//   });
//   const moreUserMessage =
//     newUsers.length > 1 ? `and ${newUsers.length - 1} others ` : '';
//   const messageText = `${userLoggedInData.firstLast} added ${userAddedName} ${moreUserMessage}to group`;
//   await sendInfoMessage(chatData.key, userLoggedInData.userId, messageText);
// };

// const sendPushNotificationForUsers = async (chatUsers, title, body, chatId) => {
//   chatUsers.forEach(async uid => {
//     console.log('test');
//     const tokens = await getUserPushTokens(uid);
//     // console.log("test2");

//     for (const key in tokens) {
//       const token = tokens[key];
//       // console.log("test3");

//       await fetch(
//         'https://fcm.googleapis.com/v1/projects/myproject-b5ae1/messages:send',
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             to: token,
//             title,
//             body,
//             data: {chatId},
//           }),
//         },
//       );
//     }
//     // console.log("test3");
//   });
// };