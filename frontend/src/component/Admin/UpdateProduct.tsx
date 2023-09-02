import { Fragment, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import {
  clearAllErrors,
  updateProduct,
  getProductDetails,
} from '../../store/actionsHelpers/productActionHelpers';
import { setAlertMessage } from '../../store/slice/user/userSlice';
import Button from '@mui/material/Button';
import MetaData from '../layout/MetaData';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import DescriptionIcon from '@mui/icons-material/Description';
import StorageIcon from '@mui/icons-material/Storage';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SideBar from './Sidebar';
import { updateProductReset } from '../../store/slice/Products/updateDeleteProductSlice';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateProduct = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams<{ id: string }>()
  const { error, product } = useAppSelector((state) => state.productDetails);

  const {
    loading,
    error: updateError,
    isUpdated,
  } = useAppSelector((state) => state.updatedeleteproduct);

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState<File[]>([]);
  const [oldImages, setOldImages] = useState<{ url: string }[]>([]);
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);

  const categories = [
    'Laptop',
    'Footwear',
    'Bottom',
    'Tops',
    'Attire',
    'Camera',
    'SmartPhones',
  ];

  const productId = params?.id || "";
  useEffect(() => {
    if (product?._id !== productId) {
      dispatch(getProductDetails(productId));
    } else {
      setName(product?.name || "");
      setDescription(product?.description || "");
      setPrice(Number(product?.price) || 0);
      setCategory(product?.category || "");
      setStock(product?.Stock || 0);
      setOldImages(product?.images || []);
    }
    if (error) {
      dispatch(setAlertMessage({ message: error, severity: 'error' }));
      dispatch(clearAllErrors());
    }
    if (updateError) {
      dispatch(setAlertMessage({ message: updateError, severity: 'error' }));
      dispatch(clearAllErrors());
    }
    if (isUpdated) {
      dispatch(setAlertMessage({ message: 'Product Updated Successfully', severity: "success" }));
      navigate('/admin/products');
      dispatch(updateProductReset());
    }
  }, [dispatch, error, navigate, isUpdated, productId, product, updateError]);

  const updateProductSubmitHandler = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const productData = {
      name,
      price,
      description,
      category,
      stock,
      images,
    };
    dispatch(updateProduct({ id: productId, productData }));
  };

  const updateProductImagesChange = (e: any) => {
    const files = Array.from(e.target.files);

    // setImages([]);
    setImages(files as any)
    setImagesPreview([]);
    setOldImages([]);

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

  return (
    <Fragment>
      <MetaData title='Create Product' />
      <div className='dashboard'>
        <SideBar />
        <div className='newProductContainer'>
          <form
            className='createProductForm'
            encType='multipart/form-data'
            onSubmit={updateProductSubmitHandler}
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
                onChange={(e) => setPrice(parseFloat(e.target.value))}
                value={price}
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
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
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
                onChange={(e) => setStock(parseFloat(e.target.value))}
                value={stock}
              />
            </div>

            <div id='createProductFormFile'>
              <input
                type='file'
                name='avatar'
                accept='image/*'
                onChange={updateProductImagesChange}
                multiple
              />
            </div>

            <div id='createProductFormImage'>
              {oldImages?.map((image, index) => (
                <img key={index} src={image.url} alt='Old Product Preview' />
              ))}
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

export default UpdateProduct;
