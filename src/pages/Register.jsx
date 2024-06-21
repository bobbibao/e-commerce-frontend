import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SectionTitle } from "../components";
import { nanoid } from "nanoid";
import { toast } from "react-toastify";

const Register = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [adress, setAddress] = useState("");

  const navigate = useNavigate();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    console.log(nanoid());
    try {
      const response = await fetch(`http://localhost:8080/user/submit-email?email=${email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      console.log(response);
      if (response.ok) {
        toast.success("Mã OTP đã được gửi tới email của bạn.");
        setStep(2);
      } else {
        toast.error("Email đã tồn tại.");
      }
    } catch (error) {
      toast.error("Error: " + error.message);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8080/user/verify-otp?email=${email}&otp=${otp}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // body: JSON.stringify({ email, otp }),
      });
      console.log(response);

      if (response.ok) {
        toast.success("OTP đã hợp lệ. Hãy điền thông tin đăng ký.");
        setStep(3);
      } else {
        toast.error("Invalid OTP. Please try again.");
      }
    } catch (error) {
      toast.error("Error: " + error.message);
    }
  };

  const isValidate = () => {
    let isProceed = true;
    let errorMessage = "";

    if (name.length === 0) {
      isProceed = false;
      errorMessage = "Please enter the value in username field";
    } else if (lastname.length === 0) {
      isProceed = false;
      errorMessage = "Please enter the value in lastname field";
    } else if (gender.length === 0) {
      isProceed = false;
      errorMessage = "Please select a gender";
    } else if (phone.length < 4) {
      isProceed = false;
      errorMessage = "Phone must be longer than 3 characters";
    } else if (adress.length < 4) {
      isProceed = false;
      errorMessage = "Address must be longer than 3 characters";
    } else if (password.length < 6) {
      isProceed = false;
      errorMessage = "Please enter a password longer than 5 characters";
    } else if (confirmPassword.length < 6) {
      isProceed = false;
      errorMessage = "Please enter a confirm password longer than 5 characters";
    } else if (password !== confirmPassword) {
      isProceed = false;
      errorMessage = "Passwords must match";
    }

    if (!isProceed) {
      toast.warn(errorMessage);
    }

    return isProceed;
  };

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();

    let regObj = {
      id: nanoid(),
      name,
      lastname,
      email,
      gender,
      phone,
      adress,
      password,
      userWishlist: [],
    };

    if (isValidate()) {
      try {
        const response = await fetch("http://localhost:8080/user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(regObj),
        });

        if (response.ok) {
          toast.success("Registration Successful");
          navigate("/login");
        } else {
          toast.error("Registration Failed. Please try again.");
        }
      } catch (error) {
        toast.error("Failed: " + error.message);
      }
    }
  };

  return (
    <div style={{ flexGrow: 1 }}>
      <SectionTitle title="Register" path="Home | Register" />
      <div className="flex flex-col justify-center sm:py-12">
        <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
          <div className="bg-dark border border-gray-600 shadow w-full rounded-lg divide-y divide-gray-200">
            {step === 1 && (
              <form className="px-5 py-7" onSubmit={handleEmailSubmit}>
                <label className="font-semibold text-sm pb-1 block text-accent-content">
                  E-mail
                </label>
                <input
                  type="email"
                  className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required={true}
                />
                <button
                  type="submit"
                  className="transition duration-200 bg-blue-600 hover:bg-blue-500 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
                >
                  <span className="inline-block mr-2">Send OTP</span>
                </button>
              </form>
            )}
            {step === 2 && (
              <form className="px-5 py-7" onSubmit={handleOtpSubmit}>
                <label className="font-semibold text-sm pb-1 block text-accent-content">
                  OTP
                </label>
                <input
                  type="text"
                  className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required={true}
                />
                <button
                  type="submit"
                  className="transition duration-200 bg-blue-600 hover:bg-blue-500 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
                >
                  <span className="inline-block mr-2">Verify OTP</span>
                </button>
              </form>
            )}
            {step === 3 && (
              <form className="px-5 py-7" onSubmit={handleRegistrationSubmit}>
                <label className="font-semibold text-sm pb-1 block text-accent-content">
                  Tên
                </label>
                <input
                  type="text"
                  className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required={true}
                />
                <label className="font-semibold text-sm pb-1 block text-accent-content">
                  Họ
                </label>
                <input
                  type="text"
                  className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  required={true}
                />
                <label className="font-semibold text-sm pb-1 block text-accent-content">
                  Giới tính
                </label>
                <select
                  className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  required={true}
                >
                  <option value="">Chọn giới tính</option>
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                  {/* <option value="Other">Khác</option> */}
                </select>
                <label className="font-semibold text-sm pb-1 block text-accent-content">
                  Số điện thoại
                </label>
                <input
                  type="tel"
                  className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required={true}
                />
                <label className="font-semibold text-sm pb-1 block text-accent-content">
                  Địa chỉ
                </label>
                <input
                  type="text"
                  className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                  value={adress}
                  onChange={(e) => setAddress(e.target.value)}
                  required={true}
                />
                <label className="font-semibold text-sm pb-1 block text-accent-content">
                  Mật khẩu
                </label>
                <input
                  type="password"
                  className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required={true}
                />
                <label className="font-semibold text-sm pb-1 block text-accent-content">
                  Nhập lại mật khẩu
                </label>
                <input
                  type="password"
                  className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required={true}
                />
                <button
                  type="submit"
                  className="transition duration-200 bg-blue-600 hover:bg-blue-500 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
                >
                  <span className="inline-block mr-2">Đăng ký</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-4 h-4 inline-block"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </button>
              </form>
            )}
          </div>
          <div className="py-5 text-center">
            <Link
              to="/login"
              className="btn btn-neutral text-white"
              onClick={() => window.scrollTo(0, 0)}
            >
              Đã có tài khoản? Đăng nhập ngay.
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
