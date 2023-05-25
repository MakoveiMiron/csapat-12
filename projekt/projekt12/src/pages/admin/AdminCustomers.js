import "./adminCustomers.css";
import { useState, useEffect } from "react";
import { readUsers } from "../../services/authCrud";
import Pagination from "../../components/pagination/Pagination";
import AdminSearchbar from "../../components/admin/adminSearchbar/AdminSearchbar";
import AdminSelectSort from "../../components/admin/AdminSelectSort";

export default function AdminCustomers() {
	const [customer, setCustomer] = useState([]);
	const [sortedList, setSortedList] = useState([]);
	const [filteredUsers, setFilteredUsers] = useState([]);
	const [currentTable, setCurrentTable] = useState([]);
	const [total, setTotal] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	const limit = 4;

	useEffect(() => {
		readUsers("vasarlok").then((resp) => {
			setCustomer(Object.values(resp));
			setSortedList(Object.values(resp));
			changeCurrentUsers(Object.values(resp));
		});
	}, []);

	function changeCurrentUsers(currentUsers) {
		setTotal(currentUsers.length);
		const firstPageIndex = (currentPage - 1) * limit;
		const lastPageIndex = firstPageIndex + limit;
		const currentTableData = currentUsers.slice(firstPageIndex, lastPageIndex);
		setCurrentTable(currentTableData);
	}
	useEffect(() => {
		changeCurrentUsers(sortedList);
	}, [currentPage, sortedList, customer]);

	return (
		<>
			<h1>Felhasználók</h1>
			<div className="pagination-container">
				<Pagination
					total={total}
					currentPage={currentPage}
					limit={limit}
					onPageChange={setCurrentPage}
				/>
			</div>
			<AdminSearchbar
				setSortedList={setSortedList}
				customers={customer}
				changeCurrentUsers={changeCurrentUsers}
				setCurrentTable={setCurrentTable}
				setFilteredUsers={setFilteredUsers}
				filteredUsers={filteredUsers}
			/>

			<AdminSelectSort customers={sortedList} setSortedList={setSortedList} />
			<table className="customersTable">
				<tr className="customersHeader">
					<th>
						<h1>Name</h1>
					</th>
					<th>
						<h1>UID</h1>
					</th>
					<th>
						<h1>Email</h1>
					</th>
				</tr>

				{currentTable.map((x) => (
					<tr className="customersData">
						<td>
							<h3>{x.name}</h3>
						</td>
						<td>
							<p>{x.uid}</p>
						</td>
						<td>
							<p>{!x.email ? "Nincs megadott email" : x.email}</p>
						</td>
					</tr>
				))}
			</table>
		</>
	);
}
