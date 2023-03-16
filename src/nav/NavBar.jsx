import { Nav, NavItem, NavLink } from 'reactstrap';

const NavBar = () => {
	return (
		<Nav tabs>
			<NavItem>
				<NavLink href='/' active>
					Home
				</NavLink>
			</NavItem>
			<NavItem>
				<NavLink href='/authors'>Authors</NavLink>
			</NavItem>
			<NavItem>
				<NavLink href='/books'>Books</NavLink>
			</NavItem>
		</Nav>
	);
};

export default NavBar;
