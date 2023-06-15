function Contact({ displayName, profilePic, username, token, id, deleteContact, chatID, setChatID ,lastMessage}) {
  let image = profilePic;
  if (profilePic instanceof File) {
    image = URL.createObjectURL(profilePic);
  }

  const handleDelete = (event) => {
    deleteContact(id); // Call the deleteContact function
  };
  let time= "";
  if(!lastMessage){
  }else{
    const date = new Date(lastMessage.created);
    time = `${date.toLocaleDateString([], { hour: '2-digit', minute: '2-digit' })}`;          
     
  }
 
  return (
      <div className="row-aaa chats">
        <span className="chatID">{id}</span>
        <img className="side-img" src={image} alt={displayName} />
        <p className="contact_name">{displayName}</p>
        <p className="date">{time}</p>
        <i className="bi bi-x-square" onClick={handleDelete}></i>
      </div>
  );
  
}

export default Contact;
  