import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import CartContainer from './components/CartContainer';
import Modal from './components/Modal';
import { 
  calculateTotals, 
  // getCartItems 
} from './features/cartSlice';

function App() {
  const { cartItems, isLoading } = useSelector((store) => store.cart);
  const { isOpen } = useSelector((store) => store.modal);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateTotals());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems]);

  return (
    <>
    { 
      isLoading ? 
      <div className='loading'>
        <h1>Loading...</h1>
      </div> :
      <main>
        {isOpen && <Modal />}
        <Navbar />
        <CartContainer />
      </main>
    }
    </>
  );
}

export default App;
