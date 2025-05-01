import { useInput, ImageField, ImageInput, ImageInputProps } from "react-admin";
import { uploadToCloudinary } from "@/utils/cloudinary";

export const CustomImageInput: React.FC<ImageInputProps> = ({ source = "image", ...props }) => {
  const {
    field, 
    // fieldState,
  } = useInput({
    source, 
    ...props,
  });

  // handle image upload and update form field
  const handleChange = async (file: File) => {
    if (!file) {
      console.error("No file selected for upload:", file);
      throw new Error("No file selected for upload.");
    }

    // console.log("File received for upload:", file);
    const imageUrl = await uploadToCloudinary(file);
    const imageData = {
      src: imageUrl,
      title: file.name,
    };
    // console.log("Image data passed to form:", imageData);

    // Update the form field with the Cloudinary URL
    field.onChange(imageData);
  };

  return (
    <ImageInput
      source={source}
      label="Image"
      multiple={false}
      onChange={handleChange} 
      {...props}
    >
      <ImageField source="src" title="title" />
    </ImageInput>
  );
};