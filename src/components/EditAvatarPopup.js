import PopupWithForm from "./PopupWithForm.js";
import { useRef } from 'react';

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
  const avatarRef = useRef();
  
  function handleSubmit(e) {
    e.preventDefault();
  
    onUpdateAvatar(
      avatarRef.current.value,
    );
  } 

  return (
    <PopupWithForm
      formType={'avatar-form'}
      formTitle={'Обновить аватар'}
      submitButtonText={'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>
      
      <input 
        ref={avatarRef}
        type="url"
        className="popup__input"
        id="avatar-link"
        name="link"
        placeholder="Ссылка на фотографию"
        required />
      <span className="popup__error" id="avatar-link-error"></span>

    </PopupWithForm>
  )
}

export default EditAvatarPopup;