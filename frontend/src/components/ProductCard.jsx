import { MdDelete } from 'react-icons/md';
import { FaRegEdit } from 'react-icons/fa';
import { Toaster, toaster } from '../components/ui/toaster';
import {
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  Dialog,
  Text,
  VStack,
  CloseButton,
  Portal,
} from '@chakra-ui/react';
import { useProductStore } from '../store/product';
import { useState } from 'react';

export default function ProductCard ({ product }) {
  const [updatedProduct, setUpdatedProduct] = useState(product);

  const { deleteProduct, updateProduct } = useProductStore();

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    if (!success) {
      toaster.create({
        title: 'Error',
        description: message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } else {
      toaster.create({
        title: 'Success',
        description: message,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleUpdateProduct = async (pid, updatedProduct) => {
    const { success, message } = await updateProduct(pid, updatedProduct);

    if (!success) {
      toaster.create({
        title: 'Error',
        description: message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } else {
      toaster.create({
        title: 'Success',
        description: 'Product updated successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: 'translateY(-5px)', shadow: 'xl' }}
    >
      <Toaster />
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w="full"
        objectFit="cover"
      />

      <Box p={4}>
        <HStack spacing={2} mb={2} justifyContent="space-between">
			<HStack spacing={2}>
			<Heading as="h3" size="xl">
				{product.name}:
			</Heading>
			<Text fontWeight="bold" fontSize="xl" >
				${product.price}
			</Text>
			</HStack>

        <HStack spacing={2}>
          <Dialog.Root placement={'center'} motionPreset="slide-in-bottom">
            <Dialog.Trigger asChild>
              <IconButton variant="subtle">
                <FaRegEdit />
              </IconButton>
            </Dialog.Trigger>
            <Portal>
              <Dialog.Backdrop />
              <Dialog.Positioner>
                <Dialog.Content>
                  <Dialog.Header>Update Product</Dialog.Header>
                  <Dialog.Body>
                    <VStack spacing={4}>
                      <Input
                        placeholder="Product Name"
                        name="name"
                        value={updatedProduct.name}
                        onChange={(e) =>
                          setUpdatedProduct({
                            ...updatedProduct,
                            name: e.target.value,
                          })
                        }
                      />
                      <Input
                        placeholder="Price"
                        name="price"
                        type="number"
                        value={updatedProduct.price}
                        onChange={(e) =>
                          setUpdatedProduct({
                            ...updatedProduct,
                            price: e.target.value,
                          })
                        }
                      />
                      <Input
                        placeholder="Image URL"
                        name="image"
                        value={updatedProduct.image}
                        onChange={(e) =>
                          setUpdatedProduct({
                            ...updatedProduct,
                            image: e.target.value,
                          })
                        }
                      />
                    </VStack>
                  </Dialog.Body>

                  <Dialog.Footer>
                    <Button
                      colorScheme="blue"
                      mr={3}
                      onClick={() =>
                        handleUpdateProduct(product._id, updatedProduct)
                      }
                    >
                      Update
                    </Button>
                    <Dialog.ActionTrigger asChild>
                      <Button variant="outline">Cancel</Button>
                    </Dialog.ActionTrigger>
                  </Dialog.Footer>
                  <Dialog.CloseTrigger asChild>
                    <CloseButton />
                  </Dialog.CloseTrigger>
                </Dialog.Content>
              </Dialog.Positioner>
            </Portal>
          </Dialog.Root>
          <Dialog.Root placement={'center'} motionPreset="slide-in-top">
            <Dialog.Trigger asChild>
              <IconButton variant="subtle" colorPalette={'red'}>
                <MdDelete />
              </IconButton>
            </Dialog.Trigger>
            <Portal>
              <Dialog.Backdrop />
              <Dialog.Positioner>
                <Dialog.Content>
                  <Dialog.Header>
                    <Dialog.Title>Warning!</Dialog.Title>
                  </Dialog.Header>
                  <Dialog.Body>
                    <p>
                      Are you sure you want to delete this product? This action
                      cannot be undone.
                    </p>
                  </Dialog.Body>
                  <Dialog.Footer>
                    <IconButton
                      onClick={() => handleDeleteProduct(product._id)}
                      variant="subtle"
                      color={'red'}
                    >
                      Yes, Delete Product
                      <MdDelete />
                    </IconButton>
                    <Dialog.ActionTrigger asChild>
                      <Button variant="outline">Cancel</Button>
                    </Dialog.ActionTrigger>
                  </Dialog.Footer>
                  <Dialog.CloseTrigger asChild>
                    <CloseButton size="sm" />
                  </Dialog.CloseTrigger>
                </Dialog.Content>
              </Dialog.Positioner>
            </Portal>
          </Dialog.Root>
        </HStack>
		</HStack>
      </Box>
    </Box>
  );
};

