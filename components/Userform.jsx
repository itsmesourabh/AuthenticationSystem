import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { signIn, signOut, useSession } from "next-auth/react";

const UserForm = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      message: Yup.string().required("Required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);

      try {
        const response = await fetch("/api/form", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        const data = await response.json();
        console.log(data);
        resetForm();
        setSuccessMessage("Form submitted successfully!");

        // Clear the success message after a few seconds
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    },
  });

  return (
    <div>
      {!session ? (
        <button
          onClick={() => signIn("google")}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Sign in with Google
        </button>
      ) : (
        <div className="flex flex-col items-center w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
          <form onSubmit={formik.handleSubmit} className="space-y-6 w-full">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="text-red-600 text-sm mt-1">
                  {formik.errors.name}
                </div>
              ) : null}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-600 text-sm mt-1">
                  {formik.errors.email}
                </div>
              ) : null}
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.message}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {formik.touched.message && formik.errors.message ? (
                <div className="text-red-600 text-sm mt-1">
                  {formik.errors.message}
                </div>
              ) : null}
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              disabled={loading}
            >
              {loading ? "Submiting" : "Submit"}
            </button>
            {successMessage && (
              <p className="text-green-600 text-sm mt-2">{successMessage}</p>
            )}
          </form>

          <button
            onClick={() => signOut()}
            className="mt-4 bg-red-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
          >
            Log Out
          </button>
        </div>
      )}
    </div>
  );
};

export default UserForm;
