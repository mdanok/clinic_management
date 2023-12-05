import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

export const EmailVerificationTemplate = ({ email, verificationLink }) => {
  const previewText = `Email Verification`;
  const baseUrl = process.env.NEXT_BASE_URL + "verify?token=";
  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto font-sans bg-white">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
            <Section className="w-full text-center mt-[32px]">
              <img
                src="https://flowbite.s3.amazonaws.com/brand/logo-dark/mark/flowbite-logo.png"
                width="40"
                height="37"
                alt="Your Company Logo"
                className="block mx-auto my-0"
              />
            </Section>

            <Heading
              as="h1"
              className="text-black font-normal text-center p-0 mt-[30px] mx-0"
            >
              MediManage
            </Heading>
            <Heading
              as="h5"
              className="text-black font-normal text-center p-0 mb-[30px] mx-0"
            >
              Email Verification
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              Hello {email},
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              Please verify your email address to continue using our services.
            </Text>
            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                className="bg-[#000000] py-4 px-16 rounded text-white text-[12px] font-semibold no-underline text-center"
                href={baseUrl + verificationLink}
              >
                Verify Email
              </Button>
            </Section>
            <Text className="text-black text-[14px] leading-[24px]">
              or copy and paste this URL into your browser:{" "}
              <Link
                href={verificationLink}
                className="text-blue-600 no-underline"
              >
                {baseUrl + verificationLink}
              </Link>
            </Text>
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              If you did not request this verification, please ignore this email
              or contact our support team.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default EmailVerificationTemplate;
