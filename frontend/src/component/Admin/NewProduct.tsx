import { Fragment, useEffect, useState } from 'react';
import './newProduct.css';
import { useAppDispatch, useAppSelector } from '../../store/store';
import {
  clearAllErrors,
  createProduct,
} from '../../store/actionsHelpers/productActionHelpers';
import { setAlertMessage } from '../../store/slice/user/userSlice';
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
import { isDevelopmentServer } from '../../constants';

const categories = [
  'Laptop',
  'Footwear',
  'Bottom',
  'Tops',
  'Attire',
  'Camera',
  'SmartPhones',
];

const NewProduct = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useAppSelector(
    (state) => state.newProduct
  );
  // Todo - setnewProduct from single state 
  const [name, setName] = useState(isDevelopmentServer ? "sample1" : "");
  const [price, setPrice] = useState(isDevelopmentServer ? 110 : 0);
  const [description, setDescription] = useState(isDevelopmentServer ? "sample description" : '');
  const [category, setCategory] = useState(isDevelopmentServer ? categories[4] : "");
  const [stock, setStock] = useState(isDevelopmentServer ? 2 : 0);
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);

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
      dispatch(newProductReset());
    }
  }, [dispatch, error, navigate, success]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(createProduct({
      name, price, description, category, stock, images
    }));
  };

  const createProductImagesChange = (e: any) => {
    const files = Array.from(e.target.files)

    setImages(files as any);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        const result = reader.result as string;
        if (result && typeof reader.result === 'string') {
          setImagesPreview((old) => [...old, reader.result] as any);
        }

      };

      reader.readAsDataURL(file as any);
    });
  };
  //Todo add loader at submit button
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
                value={price}
                required
                onChange={(e) => setPrice(parseFloat(e.target.value))}
              />
            </div>

            <div>
              <DescriptionIcon />

              <textarea
                placeholder='Product Description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols={30}
                rows={1}
              ></textarea>
            </div>

            <div>
              <AccountTreeIcon />
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
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
                value={stock}
                required
                onChange={(e) => setStock(parseInt(e.target.value))}
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
                <img key={index} src={image as any} alt='Product Preview' />
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
