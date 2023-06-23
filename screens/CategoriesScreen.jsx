import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  Modal,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  categoryList: {
    flex: 1,
  },
  category: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
  },
  categoryInfo: {
    flex: 1,
    marginRight: 10,
  },
  categoryName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  categoryDescription: {
    fontSize: 12,
    color: '#888',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    marginLeft: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'black',
  },
});

const AddCategoryModal = ({ visible, onClose, onAddCategory }) => {
  const [categoryName, setCategoryName] = useState('');
  const [categoryDetail, setCategoryDetail] = useState('');

  const handleAddCategory = async () => {
    try {
      const newCategory = {
        name: categoryName,
        description: categoryDetail,
      };

      const response = await axios.post(
        'https://northwind.vercel.app/api/categories',
        newCategory
      );
      const addedCategory = response.data;

      onAddCategory(addedCategory);
      onClose();
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <Text style={styles.heading}>Add Category</Text>
        <TextInput
          style={styles.input}
          placeholder="Category Name"
          value={categoryName}
          onChangeText={setCategoryName}
        />
        <TextInput
          style={styles.input}
          placeholder="Category Detail"
          value={categoryDetail}
          onChangeText={setCategoryDetail}
        />
        <Button title="Add" onPress={handleAddCategory} />
        <Button title="Cancel" onPress={onClose} color="red" />
      </View>
    </Modal>
  );
};

const CategoriesScreen = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        'https://northwind.vercel.app/api/categories'
      );
      setCategoryList(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleAddCategory = (addedCategory) => {
    setCategoryList([...categoryList, addedCategory]);
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await axios.delete(
        `https://northwind.vercel.app/api/categories/${categoryId}`
      );
      const updatedList = categoryList.filter(
        (category) => category.id !== categoryId
      );
      setCategoryList(updatedList);
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Category Listing</Text>
      <View style={styles.categoryList}>
        {categoryList.map((category) => (
          <View key={category.id} style={styles.category}>
            <View style={styles.column}>
              <Text style={styles.categoryName}>{category.name}</Text>
              <Text>{category.description}</Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleDeleteCategory(category.id)}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  // Navigate to the update page for the selected category
                  // You can implement the navigation logic here
                }}
              >
                <Text style={styles.buttonText}>Update</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
      <Button
        title="Add Category"
        onPress={() => setModalVisible(true)}
      />
      <AddCategoryModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAddCategory={handleAddCategory}
      />
    </View>
  );
};

export default CategoriesScreen;
