
export default function getUserId() {
  let userId = localStorage.getItem('flipOrRipUserId');
  
  if (!userId) {
    userId = crypto.randomUUID();
    localStorage.setItem('flipOrRipUserId', userId);
    console.log('Created new user ID:', userId);
  } else {
    console.log('Retrieved existing user ID:', userId);
  }
  
  return userId;
}