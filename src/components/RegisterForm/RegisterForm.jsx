import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { createUser } from "../../redux/users/operations";
import { selectPositions } from "../../redux/positions/selectors";
import { useEffect, useState } from "react";
import { fetchPositions } from "../../redux/positions/operations";
import { getToken } from "../../redux/token/operations";
import "../../styles/register.scss";
import { Success } from "../Success/Success";

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(60, "Title must be at most 60 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string()
    .matches(
      /^\+380\d{9}$/,
      "Phone number must start with +380 and contain 9 digits"
    )
    .required("Phone number is required"),
  position_id: Yup.number()
    .integer("Position ID must be an integer")
    .required("Position ID is required"),

  photo: Yup.mixed()
    .required("Photo is required")
    .test(
      "fileSize",
      "Photo size must not exceed 5 MB",
      (value) => value && value.size <= 5 * 1024 * 1024
    )
    .test(
      "fileFormat",
      "Photo format must be jpeg or jpg",
      (value) => value && ["image/jpeg", "image/jpg"].includes(value.type)
    )
    .test(
      "minDimensions",
      "Minimum photo dimensions are 70x70px",
      (value) =>
        new Promise((resolve) => {
          if (!value) return resolve(false);

          const img = new Image();
          img.src = URL.createObjectURL(value);
          img.onload = () => {
            resolve(img.width >= 70 && img.height >= 70);
          };
        })
    ),
});

export const RegisterForm = () => {
  const dispatch = useDispatch();
  const positions = useSelector(selectPositions);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    dispatch(fetchPositions());
  }, [dispatch]);

  const initialValues = {
    name: "",
    email: "",
    phone: "",
    position_id: "",
    photo: null,
  };

  const handleSubmit = async (values, actions) => {
    try {
      const result = await dispatch(getToken());
      const myToken = result.payload;
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("phone", values.phone);
      formData.append("position_id", values.position_id);
      formData.append("photo", values.photo);

      await dispatch(
        createUser({ formData, token: myToken, page: 1, count: 6 })
      ).unwrap();
      actions.resetForm();
      setIsSuccess(true);
    } catch (error) {
      toast.error(`Error: ${error}`);
    }
  };

  if (isSuccess) {
    return <Success />;
  }

  return (
    <section id="sign" className="container">
      <div className="sign-wrapper">
        <h2>Working with POST request</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue, touched, errors, isValid, dirty }) => (
            <Form>
              <div className="input-wrapper">
                <Field
                  name="name"
                  type="text"
                  placeholder="Your name"
                  className={touched.name && errors.name ? "input-error" : ""}
                />
                {touched.name && (
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="error-message"
                  />
                )}
              </div>

              <div className="input-wrapper">
                <Field
                  name="email"
                  type="email"
                  placeholder="Email"
                  className={touched.email && errors.email ? "input-error" : ""}
                />
                {touched.email && (
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error-message"
                  />
                )}
              </div>

              <div className="input-wrapper">
                <div
                  className={`phone-field ${
                    touched.phone && errors.phone ? "has-error" : ""
                  }`}
                >
                  <Field
                    name="phone"
                    type="text"
                    placeholder="Phone"
                    className={
                      touched.phone && errors.phone ? "input-error" : ""
                    }
                  />
                  {!(touched.phone && errors.phone) && (
                    <span className="phone-mask">+38 (XXX) XXX - XX - XX</span>
                  )}
                </div>
                {touched.phone && (
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="error-message"
                  />
                )}
              </div>

              <div className="positions">
                <p>Select Position:</p>
                {positions.map((pos) => (
                  <label key={pos.id} className="radio-label">
                    <Field
                      type="radio"
                      name="position_id"
                      value={String(pos.id)}
                    />
                    {pos.name}
                  </label>
                ))}
                {touched.position_id && (
                  <ErrorMessage
                    name="position_id"
                    component="div"
                    className="error-message"
                  />
                )}
              </div>
              <div className="input-wrapper">
                <label className="file-upload">
                  <span>Upload</span>
                  <input
                    name="photo"
                    type="file"
                    accept="image/jpeg, image/jpg"
                    onChange={(event) =>
                      setFieldValue(
                        "photo",
                        event.currentTarget.files[0] || null
                      )
                    }
                    className={
                      touched.photo && errors.photo ? "input-error" : ""
                    }
                  />
                  <span className="file-name">
                    {values.photo instanceof File
                      ? values.photo.name
                      : "Upload your photo"}
                  </span>
                </label>
                {touched.photo && errors.photo && (
                  <ErrorMessage
                    name="photo"
                    component="div"
                    className="error-message"
                  />
                )}
              </div>

              <button type="submit" disabled={!(isValid && dirty)}>
                Sign up
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};
