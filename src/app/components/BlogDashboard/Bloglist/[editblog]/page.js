"use client";
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Divider,
  Input,
  Select,
  SelectItem,
  Switch,
  Textarea,
} from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDropzone } from "react-dropzone";
import "../../../style/quillstyle.css";
import { PiXCircleDuotone } from "react-icons/pi";

export default function Page({ params }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [prompt, setPrompt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState([]);
  const [tags, setTags] = useState("");
  const [metatitle, setMetatitle] = useState("");
  const [metadescription, setMetadescription] = useState("");
  const [cover, setCover] = useState("");

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const router = useRouter();

  useEffect(() => {
    const getBlogDetails = async () => {
      let blogId = params.editblog;
      let BlogData = await fetch(`${BASE_URL}/api/Blog/${blogId}`);
      BlogData = await BlogData.json();
      if (BlogData.success) {
        let result = BlogData.result;
        setTitle(result.title);
        setDescription(result.description);
        setPrompt(result.prompt);
        setContent(result.content);
        setCategory(result.category);
        setTags(result.tags);
        setMetatitle(result.metatitle);
        setMetadescription(result.metadescription);
        setCover(result.cover);
        setSelectedImage(result.cover);
      }
    };

    getBlogDetails();
  }, [BASE_URL, params.editblog]);

  const updateBlog = async () => {
    let blogId = params.editblog;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("prompt", prompt);
    formData.append("content", content);
    formData.append("category", category);
    formData.append("tags", tags);
    formData.append("metatitle", metatitle);
    formData.append("metadescription", metadescription);

    if (selectedImage && typeof selectedImage !== "string") {
      const base64Image = await convertToBase64(selectedImage);
      formData.append("cover", base64Image);
    } else if (typeof selectedImage === "string") {
      formData.append("cover", selectedImage);
    }
    const convertToBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    };

    let data = await fetch(`${BASE_URL}/api/Blog/${blogId}`, {
      method: "PUT",
      body: formData, // Send form data
    });
    data = await data.json();
    if (data.result) {
      toast.success("Blog is updated successfully!");
      router.push("/components/BlogDashboard/Bloglist");
    }
  };

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  const clearImage = (e) => {
    e.stopPropagation();
    setSelectedImage(null);
  };

  const toolbarOptions = [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }],
    [{ script: "super" }, { script: "sub" }],
    ["code-block", "blockquote"],
    ["link", "image", "video"],
    [{ font: [] }],
    ["clean"],
  ];

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      :root {
        --quill-button-color: #000000;
        --quill-button-background: #ffffff;
        --quill-editor-bg: #ffffff;
        --editor-border-light: hsl(240, 6%, 90%,1);
      }
      .dark {
        --quill-button-color: #ffffff;
        --quill-button-background: #333333;
        --quill-editor-bg: #1a1a1a;
        --editor-border-dark: hsl(240, 5%, 26%,1);
      }
      .ql-editor::before {
        color: rgba(0, 0, 0, 0.5); 
      }
      .dark .ql-editor::before {
        color: rgba(255, 255, 255, 0.5);  
      }
      .ql-toolbar.ql-snow {
        border: 2px solid var(--editor-border-dark);
        padding: 0.5rem;
      }
      .ql-container.ql-snow {
        border: 2px solid var(--editor-border-dark);
        border-top: none;
      }
      .light .ql-toolbar.ql-snow{
        border: 2px solid var(--editor-border-light)
      }  
      .light .ql-container.ql-snow{
        border: 2px solid var(--editor-border-light)
      }    
      .ql-editor {
        min-height: 200px;
        max-height: 400px;
        font-size: 1rem;
        line-height: 1.5;
        overflow-y: auto;
        scrollbar-width: none; 
        -ms-overflow-style: none; 
      }
      .ql-editor::-webkit-scrollbar {
        width: 0;
        height: 0;
      }
      .ql-toolbar.ql-snow .ql-formats button {
        color: var(--quill-button-color);
      }
      .ql-toolbar.ql-snow .ql-picker-label {
        color: var(--quill-button-color);
      }
      .ql-toolbar.ql-snow .ql-stroke {
        stroke: var(--quill-button-color);
      }
      .ql-toolbar.ql-snow .ql-fill {
        fill: var(--quill-button-color);
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div>
      <Toaster richColors position="top-right" />
      <div className="flex w-full">
        <div className="w-full flex flex-col p-2 sm:p-8">
          <div className="flex justify-between items-center">
            <Breadcrumbs>
              <BreadcrumbItem>App</BreadcrumbItem>
              <BreadcrumbItem>Blog</BreadcrumbItem>
              <BreadcrumbItem>Edit</BreadcrumbItem>
            </Breadcrumbs>
          </div>
          <div className="pt-8 pb-12">
            <h1 className="text-3xl font-medium tracking-wide">Edit</h1>
          </div>
          <div>
            <div className="flex flex-col xl:flex-row">
              <div className="w-full xl:w-1/2">
                <h2 className="text-xl">Details</h2>
                <p className="text-foreground-400 text-base mt-1 mb-6 xl:mb-0">
                  Title,short,description,image...
                </p>
              </div>
              <div className="w-full xl:w-1/2 bg-foreground-50 p-2 sm:p-6 rounded-xl">
                <form action="#">
                  <div>
                    <label className="font-normal">Title</label>
                    <Input
                      type="text"
                      variant="bordered"
                      radius="lg"
                      size="lg"
                      className="mt-3 mb-6"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div>
                    <label>Description</label>
                    <Textarea
                      type="text"
                      variant="bordered"
                      radius="lg"
                      size="lg"
                      className="mt-3 mb-6 col-span-12 md:col-span-6"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <div>
                    <label>Prompt for blog content</label>
                    <Input
                      type="text"
                      variant="bordered"
                      radius="lg"
                      size="lg"
                      className="mt-3 mb-6"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col items-start w-full mb-6">
                    <label className="mb-2">Content</label>
                    <div className="w-full">
                      <ReactQuill
                        value={content}
                        onChange={setContent}
                        theme="snow"
                        modules={{
                          toolbar: toolbarOptions,
                        }}
                        className="mb-6"
                      />
                    </div>
                  </div>
                  <div>
                    <label>Category</label>
                    <Select
                      size="lg"
                      variant="bordered"
                      radius="lg"
                      className="mt-3 mb-6"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <SelectItem>item 1</SelectItem>
                      <SelectItem>item 2</SelectItem>
                      <SelectItem>item 3</SelectItem>
                    </Select>
                  </div>
                  <div className="w-full">
                    <label className="mb-2">Cover</label>
                    <div
                      {...getRootProps()}
                      className="relative mt-3 border-2 border-foreground-200 bg-foreground-100 rounded-xl p-1 cursor-pointer flex items-center justify-center w-full h-80"
                    >
                      {selectedImage ? (
                        <div>
                          <Image
                            src={
                              typeof selectedImage === "string"
                                ? selectedImage
                                : URL.createObjectURL(selectedImage)
                            }
                            alt="Selected Cover"
                            layout="fill"
                            objectFit="cover"
                            className="object-cover w-full h-full rounded-lg"
                          />
                          <button
                            onClick={clearImage}
                            className="absolute top-2 right-2 bg-gray-800 text-white rounded-full p-1 hover:bg-gray-600"
                          >
                            <PiXCircleDuotone className="w-5 h-5" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center">
                          <Image
                            src="/vector.jpg" // Default image path
                            alt="Default"
                            width={200}
                            height={176}
                            className="w-50 h-44 rounded-2xl mb-4"
                          />
                          <h1 className="text-xl font-bold mb-3">
                            Drop or Select file
                          </h1>
                          <p>
                            Drop files here or click{" "}
                            <Link
                              href="#"
                              className="text-primary border-b-1 border-primary"
                            >
                              browse
                            </Link>{" "}
                            through your machine
                          </p>
                        </div>
                      )}

                      <input {...getInputProps()} />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <div className="flex flex-col xl:flex-row">
              <div className="w-full xl:w-1/2">
                <h1 className="text-xl">Properties</h1>
                <p className="text-foreground-400 mt-1 mb-6 xl:mb-0">
                  Meta data,tags,attributes..
                </p>
              </div>
              <div className="w-full xl:w-1/2">
                <div className="bg-foreground-50 p-2 sm:p-6 mb-7 rounded-xl">
                  <form>
                    <div>
                      <label>Tags</label>
                      <Select
                        size="lg"
                        variant="bordered"
                        radius="lg"
                        className="mt-3 mb-6"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                      >
                        <SelectItem>a</SelectItem>
                        <SelectItem>p</SelectItem>
                        <SelectItem>div</SelectItem>
                      </Select>
                    </div>
                    <div>
                      <label>Meta title</label>
                      <Input
                        type="text"
                        variant="bordered"
                        radius="lg"
                        size="lg"
                        className="mt-3 mb-6"
                        value={metatitle}
                        onChange={(e) => setMetatitle(e.target.value)}
                      />
                    </div>
                    <div>
                      <label>Meta Description</label>
                      <Textarea
                        type="text"
                        variant="bordered"
                        radius="lg"
                        size="lg"
                        className="mt-3 mb-6 col-span-12 md:col-span-6"
                        value={metadescription}
                        onChange={(e) => setMetadescription(e.target.value)}
                      />
                    </div>
                    <div>
                      <Switch defaultSelected>Enable Comments</Switch>
                    </div>
                  </form>
                </div>
                <div className="flex items-start sm:items-center flex-col sm:flex-row sm:justify-between">
                  <div className="pl-2.5 pb-7 sm:pb-0 sm:pl-6">
                    <Switch defaultSelected>publish</Switch>
                  </div>
                  <div className="gap-3 flex">
                    <Button color="primary" variant="flat">
                      Preview
                    </Button>
                    <Button type="submit" color="primary" onPress={updateBlog}>
                      Save Changes
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
