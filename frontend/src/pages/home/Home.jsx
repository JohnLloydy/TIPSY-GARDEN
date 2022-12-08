import React, {useEffect, useState} from 'react'
import axios from 'axios'
import LayoutApp from '../../components/Layout'
import { Col, Row } from 'antd';
import Product from '../../components/Product';
import { useDispatch } from 'react-redux';

const Home = () => {

    const dispatch = useDispatch();

    const [productData, setProductData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('Calathea');
    const categories = [
        {
            name: "Calathea",
            imageUrl: "https://i.pinimg.com/originals/f4/47/bc/f447bcd19d8120d4b48347c81d7fd03d.png",
        },
        {
            name: "Ctenanthe",
            imageUrl: "https://thumbs.dreamstime.com/b/ctenanthe-oppenheimiana-pot-isolated-white-background-ctenanthe-oppenheimiana-pot-ornamental-plants-home-decoration-210278885.jpg",
        },
        {
            name: "Maranta",
            imageUrl: "https://w7.pngwing.com/pngs/180/992/png-transparent-maranta-leuconeura-ornamental-plant-leaf-calatheas-plant-leaf-interior-design-services-garden.png",
        },
        {
            name: "Petunia",
            imageUrl: "https://e7.pngegg.com/pngimages/918/552/png-clipart-flower-petunia-hanging-basket-rhapis-excelsa-houseplant-flower-violet-flower-garden.png",
        },
    ]
    const axiosUrl = "http://localhost:5000/api/products/getproducts"

    useEffect(()=> {
        const getAllProducts = async () => {
            try {
                dispatch({
                    type: "SHOW_LOADING",
                });
                const {data} = await axios.get(axiosUrl);
                setProductData(data);
                dispatch({
                    type: "HIDE_LOADING",
                });
                console.log(data);
                
            } catch (error) {
                console.log(error);
            }
        };

        getAllProducts();
    }, [dispatch]);

    return (
        <LayoutApp >
            <div className="category">
                {categories.map((category) => (
                    <div key={category.name} className={`categoryFlex ${selectedCategory === category.name &&
                     'category-active'}`} onClick={() => setSelectedCategory(category.name)} >
                        <h3 className="categoryName">{category.name}</h3>
                        <img src={category.imageUrl} alt={category.name} height={60} width={60} />
                    </div>
                ))}
            </div>
            <Row>
                {productData.filter((i) => i.category === selectedCategory).map (product => (
                    <Col xs={24} sm={6} md={12} lg={6}>
                        <Product key={product.id} product={product} />
                    </Col>
                ))}
            </Row>
        </LayoutApp>
    )
}

export default Home