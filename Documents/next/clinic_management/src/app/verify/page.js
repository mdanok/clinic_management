import Image from "next/image";

export default async function EmailVerification({ searchParams }) {
  if (searchParams.token) {
    const response = await fetch("http://localhost:3000/api/verify", {
      method: "POST",
      body: JSON.stringify({ token: searchParams.token }),
    });
    const data = await response.json();
    if (data.length === 0 || response.status !== 200) {
      return <ErrorPage />;
    } else {
      return <SuccessPage />;
    }
  } else {
    return <ErrorPage />;
  }
}

const ErrorPage = () => {
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <Image
            width={32}
            height={32}
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          MediManage
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-center text-gray-900 md:text-2xl dark:text-white">
              Email Verification Failed!
            </h1>
            <div className="text-center">
              <Image
                width={96}
                height={96}
                className="w-24 h-24 mx-auto mb-4"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Cross_red_circle.svg/768px-Cross_red_circle.svg.png"
                alt="Error Icon"
              />
              <p className="mb-4 text-gray-700 text-md dark:text-gray-300">
                Your email verification link is invalid. Please try again.
              </p>
              <a
                href="/register"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Register Again
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const SuccessPage = () => {
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <Image
            width={32}
            height={32}
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          MediManage
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-center text-gray-900 md:text-2xl dark:text-white">
              Email Verified Successfully!
            </h1>
            <div className="text-center">
              <Image
                width={96}
                height={96}
                className="w-24 h-24 mx-auto mb-4"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Eo_circle_green_checkmark.svg/512px-Eo_circle_green_checkmark.svg.png?20200417132424"
                alt="Success Icon"
              />
              <p className="mb-4 text-gray-700 text-md dark:text-gray-300">
                Your email has been successfully verified. You can now access
                all the features of your account.
              </p>
              <a
                href="/dashboard"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Go to Dashboard
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
