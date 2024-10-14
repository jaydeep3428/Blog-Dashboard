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
import { FaItalic } from "react-icons/fa6";
import { GoBold } from "react-icons/go";
import { MdOutlineFormatUnderlined, MdStrikethroughS } from "react-icons/md";
import { PiCaretUpDownFill, PiTextAUnderlineBold } from "react-icons/pi";
import { toast, Toaster } from "sonner";

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
    let data = await fetch(`${BASE_URL}/api/Blog/${blogId}`, {
      method: "PUT",
      body: JSON.stringify({
        title,
        description,
        prompt,
        content,
        category,
        tags,
        metatitle,
        metadescription,
        cover,
      }),
    });
    data = await data.json();
    if (data.result) {
      toast.success("Blog is updated successfully!");
      router.push("/components/BlogDashboard/Bloglist");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div>
      <Toaster richColors position="top-right" />
      <div className="flex w-full">
        <div className="w-full flex flex-col p-8">
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
            <div className="flex">
              <div className="w-1/2">
                <h2 className="text-xl">Details</h2>
                <p className="text-foreground-400 text-base mt-1">
                  Title,short description,image...
                </p>
              </div>
              <div className="w-1/2 bg-foreground-50 p-6 rounded-xl">
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
                    <div className="w-full border-2 rounded-xl border-foreground-200">
                      <div className="flex items-center p-4 gap-5">
                        <p>Normal</p>
                        <PiCaretUpDownFill size={20} />
                        <GoBold size={20} />
                        <FaItalic size={20} />
                        <MdOutlineFormatUnderlined size={20} />
                        <MdStrikethroughS size={20} />
                        <PiTextAUnderlineBold size={20} />
                      </div>
                      <Divider className="h-0.5" />
                      <div>
                        <Textarea
                          radius="none"
                          type="text"
                          // rows={9}
                          className="row-span-9"
                          size="lg"
                          value={content}
                          onChange={(e) => setContent(e.target.value)}
                        />
                      </div>
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
                    <div className="relative mt-3 border-2 border-foreground-200 bg-foreground-100 rounded-xl p-1 flex items-center justify-center w-full h-80">
                      {selectedImage ? (
                        <Image
                          src={selectedImage}
                          alt="Selected Cover"
                          layout="fill"
                          objectFit="cover"
                          className="object-cover w-full h-full rounded-lg"
                        />
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
                            <Link href="#" underline="active">
                              browse
                            </Link>{" "}
                            through your machine
                          </p>
                        </div>
                      )}

                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <div className="flex">
              <div className="w-1/2">
                <h1 className="text-xl">Properties</h1>
                <p className="text-foreground-400 mt-1">
                  Meta data,tags,attributes..
                </p>
              </div>
              <div className="w-1/2">
                <div className="bg-foreground-50 p-6 mb-7 rounded-xl">
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
                <div className="flex items-center justify-between">
                  <div className="pl-6">
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
