"use client";
import { useState, useEffect, useContext } from "react";
import dynamic from "next/dynamic";
import {
  Button,
  Breadcrumbs,
  BreadcrumbItem,
  Input,
  Textarea,
  Select,
  SelectItem,
  Switch,
} from "@nextui-org/react";
import { toast, Toaster } from "sonner";
import Image from "next/image";
import "react-quill/dist/quill.snow.css";
import "../../style/quillstyle.css";
import { useDropzone } from "react-dropzone";
import Link from "next/link";
import { PiXCircleDuotone } from "react-icons/pi";
import { useRouter } from "next/navigation";
import AuthContext from "../Context/AuthContext";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const defaultImage = "/vector.jpg";

export default function Blog() {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [prompt, setPrompt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [metatitle, setMetatitle] = useState("");
  const [metadescription, setMetadescription] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = (e) => {
    e.stopPropagation();
    setSelectedImage(null);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !content || !category || !selectedImage) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const postData = {
      title,
      description,
      prompt,
      content,
      category,
      tags,
      metatitle,
      metadescription,
      cover: selectedImage,
      author: user?.name || user?.email,
    };

    let result = await fetch(`${BASE_URL}/api/Blog`, {
      method: "POST",
      body: JSON.stringify(postData),
    });
    result = await result.json();
    if (result.success) {
      toast.success("New Blog Created Successfully.");
      router.push("/components/BlogDashboard/Bloglist");
      setTitle("");
      setDescription("");
      setPrompt("");
      setContent("");
      setCategory([]);
      setTags([]);
      setMetatitle("");
      setMetadescription("");
      setSelectedImage(null);
    } else {
      toast.error("Failed to Create Blog.");
    }
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
      <div>
        <div className="w-full flex flex-col p-2 sm:p-8">
          <div className="flex justify-between items-center">
            <Breadcrumbs>
              <BreadcrumbItem>App</BreadcrumbItem>
              <BreadcrumbItem>Blog</BreadcrumbItem>
              <BreadcrumbItem>Create</BreadcrumbItem>
            </Breadcrumbs>
          </div>
          <div className="pt-8 pb-12">
            <h1 className="text-2xl sm:text-3xl font-medium tracking-wide">
              Create a Blog
            </h1>
          </div>
          <div>
            <div className="flex flex-col xl:flex-row">
              <div className="w-full xl:w-1/2">
                <h2 className="text-xl">Details</h2>
                <p className="text-foreground-400 text-base mt-1 mb-6 xl:mb-0">
                  Title,short description,image...
                </p>
              </div>
              <div className="w-full xl:w-1/2 bg-foreground-50 p-2 sm:p-8 rounded-xl">
                <form action="#">
                  <div>
                    <label className="font-normal">Title</label>
                    <Input
                      type="text"
                      label="Enter your blog title.."
                      variant="bordered"
                      radius="lg"
                      size="sm"
                      className="mt-3 mb-6"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div>
                    <label>Description</label>
                    <Textarea
                      type="text"
                      label="Enter your blog description.."
                      variant="bordered"
                      radius="lg"
                      size="sm"
                      className="mt-3 mb-6 col-span-12 md:col-span-6"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <div>
                    <label>Prompt for blog content</label>
                    <Input
                      type="text"
                      label="Enter your Prompt for blog content.."
                      variant="bordered"
                      radius="lg"
                      size="sm"
                      className="mt-3 mb-6"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col items-start w-full mb-6">
                    <label className="mb-2">Content</label>
                    <div className="w-full">
                      <div>
                        <ReactQuill
                          theme="snow"
                          placeholder="Write something awesome..."
                          value={content}
                          modules={{
                            toolbar: toolbarOptions,
                          }}
                          onChange={setContent}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label>Category</label>
                    <Select
                      label="Select category.."
                      size="sm"
                      variant="bordered"
                      radius="lg"
                      className="mt-3 mb-6"
                      selectionMode="multiple"
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
                      {...getRootProps({ className: "dropzone" })}
                      className="border-2 border-foreground-200 bg-foreground-100 flex flex-col justify-center items-center mt-3 h-80 cursor-pointer rounded-lg"
                    >
                      <input {...getInputProps()} />
                      {selectedImage ? (
                        <div className="relative w-full h-full">
                          <Image
                            src={selectedImage}
                            alt="Selected Preview"
                            width={200}
                            height={200}
                            className="w-full h-full object-cover rounded-lg"
                          />
                          <button
                            onClick={clearImage}
                            className="absolute top-2 right-2 bg-gray-800 text-white rounded-full p-1 hover:bg-gray-600"
                          >
                            <PiXCircleDuotone className="w-5 h-5" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full">
                          <Image
                            src={defaultImage}
                            alt="Default Preview"
                            height={176}
                            width={200}
                            className="w-40 h-36 object-cover rounded-lg"
                          />
                          <h1 className="text-xl font-bold my-3">
                            Drop or Select file
                          </h1>
                          <p className="text-center">
                            Drag files here or click{" "}
                            <Link
                              href="#"
                              className="border-b-2 border-primary text-primary"
                            >
                              browse
                            </Link>{" "}
                            through your machine
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <div className="flex flex-col xl:flex-row ">
              <div className="w-full xl:w-1/2 mb-6 xl:mb-0">
                <h1 className="text-xl">Properties</h1>
                <p className="text-foreground-400 mt-1">
                  Meta data,tags,attributes..
                </p>
              </div>
              <div className="w-full xl:w-1/2">
                <div className="bg-foreground-50 p-2 sm:p-6 mb-7 rounded-xl">
                  <form>
                    <div>
                      <label>Tags</label>
                      <Select
                        label="Enter your blog tags.."
                        size="sm"
                        variant="bordered"
                        radius="lg"
                        className="mt-3 mb-6"
                        selectionMode="multiple"
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
                        label="Enter your blog meta title.."
                        variant="bordered"
                        radius="lg"
                        size="sm"
                        className="mt-3 mb-6"
                        value={metatitle}
                        onChange={(e) => setMetatitle(e.target.value)}
                      />
                    </div>
                    <div>
                      <label>Meta Description</label>
                      <Textarea
                        type="text"
                        label="Enter your blog meta description.."
                        variant="bordered"
                        radius="lg"
                        size="sm"
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
                    <Button
                      type="submit"
                      color="primary"
                      onClick={handleSubmit}
                    >
                      Create Post
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
