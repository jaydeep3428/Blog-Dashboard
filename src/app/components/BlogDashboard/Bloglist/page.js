"use client";
import { useContext, useEffect, useState } from "react";
import {
  Link,
  Button,
  Breadcrumbs,
  BreadcrumbItem,
  CardBody,
  Card,
  Pagination,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Skeleton,
} from "@nextui-org/react";
import Image from "next/image";
import { FaCopy, FaPencil, FaPlus } from "react-icons/fa6";
import { BsBoxArrowUpRight, BsThreeDots } from "react-icons/bs";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { toast, Toaster } from "sonner";
import AuthContext from "../Context/AuthContext";

export default function Bloglist() {
  const { user } = useContext(AuthContext);
  const [blogdata, setBlogData] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [currentBlogId, setCurrentBlogId] = useState(null);
  const [openPopoverId, setOpenPopoverId] = useState(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    const fetchList = async () => {
      try {
        const data = await fetch(`${BASE_URL}/api/Blog`);
        const result = await data.json();
        setBlogData(result.result);
        setLoading(false); // Stop loading after fetching data
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setLoading(false); // Stop loading on error
      }
    };
    fetchList();
  }, [BASE_URL]);

  const userInitial = user?.name
    ? user.name.charAt(0).toUpperCase()
    : user?.email?.charAt(0).toUpperCase() || "?";

  const deleteItem = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/api/Blog/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data.success) {
        setBlogData(blogdata.filter((item) => item._id !== id));
        toast.error("Blog Deleted Successfully.");
        setDeleteModalOpen(false);
      }
    } catch (error) {
      console.error("Failed to delete data:", error);
    }
  };

  const handleDeleteClick = (id) => {
    setCurrentBlogId(id);
    setDeleteModalOpen(true);
    setOpenPopoverId(null);
  };

  const togglePopover = (id) => {
    if (openPopoverId === id) {
      setOpenPopoverId(null);
    } else {
      setOpenPopoverId(id);
    }
  };

  return (
    <div>
      <Toaster richColors position="top-right" />
      <div className="flex w-full">
        <div className="w-full flex flex-col p-2 sm:p-8">
          <div className="flex justify-between items-center">
            <div>
              <Breadcrumbs>
                <BreadcrumbItem>App</BreadcrumbItem>
                <BreadcrumbItem>Blog</BreadcrumbItem>
                <BreadcrumbItem>List</BreadcrumbItem>
              </Breadcrumbs>
            </div>
            <div>
              <Button as={Link} href="Blog" startContent={<FaPlus />}>
                Create Blog
              </Button>
            </div>
          </div>
          <div className="py-10">
            <h1 className="text-2xl sm:text-3xl font-medium tracking-wide">
              Our Blogs
            </h1>
          </div>
          <div>
            <div className="grid grid-rows-3 grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-4">
              {loading ? (
                Array.from({ length: 4 }).map((_, idx) => (
                  <Card key={idx}>
                    <CardBody className="p-2">
                      <div className="flex flex-col sm:flex-row-reverse">
                        <div className="w-full">
                          <Skeleton className="w-full h-64 object-cover rounded-xl" />
                        </div>
                        <div className="px-0 sm:px-4 w-full">
                          <div className="flex justify-between items-center py-5">
                            <Skeleton className="h-7 rounded-lg w-1/4" />
                            <Skeleton className="h-7 rounded-lg w-1/6" />
                          </div>
                          <Skeleton className="h-7 rounded-xl w-full mb-3" />
                          <Skeleton className="h-7 rounded-xl w-full" />
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                ))
              ) : blogdata.length > 0 ? (
                blogdata.map((e) => (
                  <Card key={e._id}>
                    <CardBody className="p-2">
                      <div className="flex flex-col sm:flex-row-reverse">
                        <div className="relative w-full">
                          <Image
                            src={e.cover}
                            width={200}
                            height={150}
                            alt="#"
                            className="w-full h-64 object-cover rounded-xl"
                          />
                        </div>
                        <div className="px-0 sm:px-4 w-full">
                          <div className="flex justify-between items-center py-5">
                            <Button size="sm" variant="flat" color="primary">
                              Published
                            </Button>
                            <p className="text-sm text-foreground-500">
                              21 sep 2024
                            </p>
                          </div>
                          <p className="line-clamp-2 mb-5 font-semibold">
                            {e.description}
                          </p>
                          <p className="line-clamp-2 text-sm">
                            {e.metadescription}
                          </p>

                          <Popover
                            backdrop="transparent"
                            showArrow
                            placement="bottom-start"
                            isOpen={openPopoverId === e._id}
                            onOpenChange={() => togglePopover(e._id)}
                          >
                            <PopoverTrigger>
                              <span>
                                <BsThreeDots
                                  className="cursor-pointer my-6"
                                  size={25}
                                />
                              </span>
                            </PopoverTrigger>
                            <PopoverContent>
                              <div className="pl-1 py-2 w-36">
                                <div className="text-medium  gap-4">
                                  <Button
                                    startContent={<BsBoxArrowUpRight />}
                                    variant="light"
                                    className="w-full justify-start gap-5"
                                  >
                                    View
                                  </Button>
                                </div>
                                <div className="text-medium flex items-center gap-4">
                                  <Button
                                    startContent={<FaPencil />}
                                    variant="light"
                                    className="w-full justify-start gap-5"
                                    as={Link}
                                    href={"Bloglist/" + e._id}
                                  >
                                    Edit
                                  </Button>
                                </div>
                                <div className="text-medium flex items-center gap-4">
                                  <Button
                                    startContent={<FaCopy />}
                                    variant="light"
                                    className="w-full justify-start gap-5"
                                  >
                                    Copy
                                  </Button>
                                </div>
                                <div className="text-medium flex items-center gap-4">
                                  <Button
                                    onPress={() => handleDeleteClick(e._id)}
                                    startContent={<RiDeleteBin5Fill />}
                                    variant="light"
                                    color="danger"
                                    className="w-full justify-start gap-5"
                                  >
                                    Delete
                                  </Button>
                                </div>
                              </div>
                            </PopoverContent>
                          </Popover>
                        </div>
                        <div className="absolute right-4 top-6">
                          <span
                            color="foreground"
                            className="text-tiny bg-foreground-200 px-4 pt-3 pb-3 rounded-xl"
                          >
                            {userInitial}
                          </span>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                ))
              ) : (
                <p>No blogs found</p>
              )}
            </div>
          </div>
          <div className="flex justify-center pt-8">
            <Pagination showControls total={1} />
          </div>
        </div>
      </div>

      <Modal
        isOpen={isDeleteModalOpen}
        hideCloseButton
        className="bg-transparent backdrop-blur-md"
      >
        <ModalContent backdrop="blur">
          <ModalBody className="px-7 py-7">
            <p className="text-lg">Delete</p>
            <p className="text-base tracking-wider">
              Are you sure want to delete?
            </p>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="solid"
              onPress={() => deleteItem(currentBlogId)}
            >
              Delete
            </Button>
            <Button
              variant="bordered"
              onPress={() => setDeleteModalOpen(false)}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
