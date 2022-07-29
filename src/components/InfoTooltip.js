function InfoTooltip({onClose, isConfirmed}) {
  
  return (
    <div className={`popup popup_type_info-tip ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button 
          type="button" 
          aria-label="close-popup" 
          className="popup__closer hover-animated"
          onClick={onClose}
        ></button>
        <div></div>
        <h2>
          {isConfirmed? 
          "Вы успешно зарегистрировались!":
          "Что-то пошло не так! Попробуйте ещё раз."
          }
        </h2>
      </div>
    </div>
  );
}

export default InfoTooltip;