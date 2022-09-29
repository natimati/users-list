import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { LockFill, TrashFill, UnlockFill } from "react-bootstrap-icons";
import { blockUsers, deleteUsers, getAllUsers, unblockUsers } from "../../api";
import { parseJwt } from "../../helpers/auth";
import { useNavigate } from "react-router-dom";
import moment from "moment"

type User = {
  id: number;
  username: string;
  email: string;
  last_login_time: string;
  registration_time: string;
  is_blocked: boolean;
}

interface Props {
  users: User[];
  selectedUserIds: number[];
  onCheckboxChange: (id: number) => void
}

const TableContent = (props: Props) => {
  return (
    <>
      {props.users.map(user => {
        const registrationTime = moment(user.registration_time).format('llll');
        const lastLoginTime = moment(user.last_login_time).format('llll');
        return (
          <tr key={user.id}>
            <td>
              <Form.Check
                type={"checkbox"}
                id={`default-checkbox`}
                checked={props.selectedUserIds.includes(user.id)}
                onChange={() => {
                  props.onCheckboxChange(user.id)
                }}
              />
            </td>
            <td>{user.id}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{lastLoginTime}</td>
            <td>{registrationTime}</td>
            <td>{user.is_blocked ? 'blocked' : 'active'}</td>
          </tr>
        )
      }
      )}
    </>
  )
};

const UserPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);
  const navigate = useNavigate();
  const isCheckAll = users.length === selectedUserIds.length;

  useEffect(() => {
    getAllUsers()
      .then((users) => {
        if (users) {
          setUsers(users);
        }
      })
  }, []);

  const handleSelectAll = () => {
    if (!isCheckAll) {
      setSelectedUserIds(users.map(user => user.id))
    } else {
      setSelectedUserIds([]);
    }
  }

  const onCheckboxChange = (id: number) => {
    if (selectedUserIds.includes(id)) {
      setSelectedUserIds(prev => prev.filter(userId => userId !== id))
    } else {
      setSelectedUserIds(prev => [...prev, id])
    }
  };

  const handleUsersBlock = () => {
    
    blockUsers(selectedUserIds).then(() => {
      const token = localStorage.getItem("token");
      const decoded = parseJwt(token as string) as { id: number };
      if (selectedUserIds.includes(decoded.id)) {
        localStorage.removeItem("token");
        navigate("/login")
      };
      setUsers(prev => {
        return prev.map(user => {
          if (selectedUserIds.includes(user.id)) {
            return { ...user, is_blocked: true }
          }
          return user;
        })
      })
      setSelectedUserIds([])
    })
  };

  const handleUsersUnblock = () => {
    unblockUsers(selectedUserIds).then(() => {

      setUsers(prev => {
        return prev.map(user => {
          if (selectedUserIds.includes(user.id)) {
            return { ...user, is_blocked: false }
          }
          return user;
        })
      })
      setSelectedUserIds([])
    })
  };

  const handleDelete = () => {
    deleteUsers(selectedUserIds).then(() => {
      const token = localStorage.getItem("token");
      const decoded = parseJwt(token as string) as { id: number };
      if (selectedUserIds.includes(decoded.id)) {
        localStorage.removeItem("token");
        navigate("/login")
      };
      setUsers(prev => prev.filter(user => !selectedUserIds.includes(user.id)))
      setSelectedUserIds([])
    })
    
  }

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <Form.Check
                type={"checkbox"}
                name={"selectAll"}
                id={"selectAll"}
                checked={isCheckAll}
                onChange={handleSelectAll}
              />
            </th>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Last login time</th>
            <th>Registration time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <TableContent
            users={users}
            selectedUserIds={selectedUserIds}
            onCheckboxChange={onCheckboxChange}
          />
        </tbody>
      </Table>
      <div className="d-flex gap-2">
      <Button className="d-inline-flex gap-1" variant="outline-danger" onClick={handleUsersBlock}>
        <LockFill size={20} />
        Block
      </Button>
      <Button className="d-inline-flex gap-2" variant="outline-danger" onClick={handleUsersUnblock}>
        <UnlockFill size={20} />
      </Button>
      <Button className="d-inline-flex gap-2" variant="outline-danger" onClick={handleDelete}>
        <TrashFill size={20} />
        </Button>
      </div>
    </>
  );
};

export default UserPage;