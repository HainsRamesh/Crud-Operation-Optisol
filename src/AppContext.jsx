import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const GlobalContext = createContext();
const URL = "http://54.202.218.249:9501/api/users";

const AppContext = (props) => {
  const [userData, setUserData] = useState([]);
  const [selectedData, setSelectedData] = useState({});
  const [selectedEditData, setSelectedEditData] = useState({});
  const [selectedDeleteData, setSelectedDeleteData] = useState({});
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  //Get Data
  const fetchData = async () => {
    try {
      const response = await axios.get(`${URL}`, {
        headers: { Accept: "application/json" },
      });
      setUserData(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    phoneNumber2: "",
    phoneNumber3: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    qualification: "",
    comments: "",
  });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  //Post Data
  const handleSubmit = (e) => {
    e.preventDefault();
    postData(input);
    setInput({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      phoneNumber2: "",
      phoneNumber3: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      qualification: "",
      comments: "",
    });
    toast.success("Successfully added");
  };

  const postData = async (input) => {
    try {
      await axios.post(URL, input);
    } catch (error) {
      console.log(error.response.data);
      throw error;
    }
  };

  // Edit Data
  const handleEdit = (data) => {
    setSelectedEditData(data);
    setShowEditModal(true);
    document.body.classList.add("modal-open");
  };

  const handleEditClose = () => {
    setShowEditModal(false);
    document.body.classList.remove("modal-open");
  };

  const handleEditSubmission = async (e, data) => {
    e.preventDefault();

    try {
      await axios.put(`${URL}/${data.id}`, data);
      toast.success("successfully updated");
      setShowEditModal(false);
    } catch (error) {
      console.log(error.response.data);
      throw error;
    }
  };

  // Delete Data
  const handleDeleteModal = (data) => {
    setSelectedDeleteData(data.id);
    setShowDeleteModal(true);
  };

  const handleDeleteClose = () => {
    setShowDeleteModal(false);
  };

  const confirmDelete = async (id) => {
    try {
      await axios.delete(`${URL}/${id}`);
      toast.success("user has been removed");
      setShowDeleteModal(false);
    } catch (error) {
      console.log(error.response.data);
      throw error;
    }
  };

  // View Data
  const handleView = (data) => {
    setSelectedData(data);
    setShowViewModal(true);
    document.body.classList.add("modal-open");
  };

  // Close View Window
  const handleViewClose = () => {
    setShowViewModal(false);
    document.body.classList.remove("modal-open");
  };

  useEffect(() => {
    fetchData();
  }, [userData]);

  return (
    <GlobalContext.Provider
      value={{
        userData,
        input,
        handleChange,
        handleSubmit,
        handleEdit,
        handleDeleteModal,
        handleView,
        handleDeleteClose,
        selectedData,
        showViewModal,
        handleViewClose,
        showDeleteModal,
        setShowDeleteModal,
        confirmDelete,
        selectedEditData,
        showEditModal,
        handleEditClose,
        handleEditSubmission,
        selectedDeleteData,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export default AppContext;
