import { Button, Container, Flex, HStack, Text} from "@chakra-ui/react";
import {ColorModeButton } from "./ui/color-mode";
import { Link } from "react-router-dom";
import { CiSquarePlus } from "react-icons/ci";

export default function NavBar() {


  return (
<Container maxW={"1140px"} px={4}>
			<Flex
				h={16}
				alignItems={"center"}
				justifyContent={"space-between"}
				flexDir={{
					base: "column",
					sm: "row",
				}}
			>
				<Text
					fontSize={{ base: "22", sm: "28" }}
					fontWeight={"bold"}
					textTransform={"uppercase"}
					textAlign={"center"}
					bgGradient="to-r" gradientFrom="red.400" gradientTo="blue.500"
					bgClip={"text"}
				>
					<Link to={"/"}>Product Store 🛒</Link>
				</Text>
				<HStack spacing={2} alignItems={"center"}>
					<Link to={"/create"} title="Create a new product">
						<Button variant="subtle">
							<CiSquarePlus  />
						</Button>
					</Link>
					<ColorModeButton variant="subtle" title={'toggle mode'}/>
				</HStack>
			</Flex>
		</Container>
  )
}
