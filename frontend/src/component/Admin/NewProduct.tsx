import { Fragment, useEffect, useState } from 'react';
import './newProduct.css';
import { useAppDispatch, useAppSelector } from '../../store/store';
import {
  clearAllErrors,
  createProduct,
} from '../../store/actionsHelpers/productActionHelpers';
import { setAlertMessage } from '../../store/slice/userSlice';
import Button from '@mui/material/Button';
import MetaData from '../layout/MetaData';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import DescriptionIcon from '@mui/icons-material/Description';
import StorageIcon from '@mui/icons-material/Storage';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Sidebar from './Sidebar';
import { newProductReset } from '../../store/slice/Products/newProductSlice';
import { useNavigate } from 'react-router-dom';

const NewProduct = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useAppSelector(
    (state) => state.newProduct
  );

  const [productData, setProductData] = useState({
    name: '',
    price: 0,
    description: '',
    category: '',
    Stock: 0,
    images: [],
    imagesPreview: [],
  });

  const categories = [
    'Laptop',
    'Footwear',
    'Bottom',
    'Tops',
    'Attire',
    'Camera',
    'SmartPhones',
  ];

  useEffect(() => {
    if (error) {
      dispatch(setAlertMessage({ message: error, severity: 'error' }));
      dispatch(clearAllErrors());
    }

    if (success) {
      dispatch(
        setAlertMessage({
          message: 'Product Created Successfully',
          severity: 'success',
        })
      );
      navigate('/admin/dashboard');
      dispatch(newProductReset);
    }
  }, [dispatch, error, navigate, success]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(createProduct(productData, productData.images));
  };

  const createProductImagesChange = e => {
    const files = Array.from(e.target.files);

    setProductData(prevData => ({
      ...prevData,
      images: [],
      imagesPreview: [],
    }));

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setProductData(prevData => ({
            ...prevData,
            imagesPreview: [...prevData.imagesPreview, reader.result],
            images: [...prevData.images, reader.result],
          }));
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      <MetaData title='Create Product' />
      <div className='dashboard'>
        <Sidebar />
        <div className='newProductContainer'>
          <form
            className='createProductForm'
            encType='multipart/form-data'
            onSubmit={createProductSubmitHandler}
          >
            <h1>Create Product</h1>

            <div>
              <SpellcheckIcon />
              <input
                type='text'
                placeholder='Product Name'
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <AttachMoneyIcon />
              <input
                type='number'
                placeholder='Price'
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div>
              <DescriptionIcon />

              <textarea
                placeholder='Product Description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols='30'
                rows='1'
              ></textarea>
            </div>

            <div>
              <AccountTreeIcon />
              <select onChange={(e) => setCategory(e.target.value)}>
                <option value=''>Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <StorageIcon />
              <input
                type='number'
                placeholder='Stock'
                required
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            <div id='createProductFormFile'>
              <input
                type='file'
                name='avatar'
                accept='image/*'
                onChange={createProductImagesChange}
                multiple
              />
            </div>

            <div id='createProductFormImage'>
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt='Product Preview' />
              ))}
            </div>

            <Button
              id='createProductBtn'
              type='submit'
              disabled={loading ? true : false}
            >
              Create
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewProduct;
