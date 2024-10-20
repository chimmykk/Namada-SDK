import { createSignal } from 'solid-js';
import './styles.css'; // Make sure to import your CSS styles

const NamaZoro = () => {
  return (
    <div class="container">
      <div class="logo-container">
        <img 
          src="https://play-lh.googleusercontent.com/VRqo1bQjwHpkYU3ywbL7CXaT1A56_t_3wPioG_GiajSnGtn6aTTzB69My4oOLBHvnw" 
          alt="Cake Wallet Logo" 
          class="logo" 
        />
      </div>
      <h1>Welcome to Zoro</h1>
      <p>Keep Your Crypto Safe: Privacy Meets Security with Zoro!</p>
      <div class="button-container">
        <a href="sample.html">
          <button class="primary-button">Create New Wallet</button>
        </a>
        <a href="importnew.html">
          <button class="secondary-button">Restore Wallet</button>
        </a>
      </div>
    </div>
  );
};

export default NamaZoro;
