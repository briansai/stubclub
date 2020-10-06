const Button = ({ color, text, onClick }) => (
  <div className="btn-container">
    <button className={`btn btn-${color}`} onClick={onClick} name={text}>
      {text}
    </button>
  </div>
);

export default Button;
