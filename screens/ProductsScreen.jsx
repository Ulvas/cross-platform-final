import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { ListItem, Button, Overlay } from '@rneui/themed';
import axios from 'axios';

const ProductsScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        'https://northwind.vercel.app/api/products'
      );
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(
        `https://northwind.vercel.app/api/products/${productId}`
      );
      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  const handleProductPress = (product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setModalVisible(false);
  };

  const renderProductDetail = () => {
    if (!selectedProduct) {
      return null;
    }

    return (
      <Overlay isVisible={modalVisible} onBackdropPress={closeModal}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>
            {selectedProduct.name}
          </Text>
          <Text>Price: {selectedProduct.unitPrice}</Text>
          <Text>
            Quantity Per Unit: {selectedProduct.quantityPerUnit}
          </Text>
          <Text>Units In Stock: {selectedProduct.unitsInStock}</Text>
          <Button title="Close" onPress={closeModal} />
        </View>
      </Overlay>
    );
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleProductPress(item)}>
      <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Title>{item.name}</ListItem.Title>
          <ListItem.Subtitle>
            Price: {item.unitPrice}
          </ListItem.Subtitle>
        </ListItem.Content>
        <Button
          title="Delete"
          type="outline"
          onPress={() => handleDelete(item.id)}
        />
      </ListItem>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {products.length === 0 ? (
        <Text>No products found.</Text>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      )}
      {renderProductDetail()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  modalContainer: {
    padding: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default ProductsScreen;
