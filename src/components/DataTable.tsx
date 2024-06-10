import {
  Button,
  Checkbox,
  Flex,
  PaginationProps,
  Table,
  TableColumnsType,
} from "antd";
import { useAppDispatch, useAppSelector } from "../hook";
import { useEffect, useState } from "react";
import { TableRowSelection } from "antd/es/table/interface";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { deleted } from "../features/dataSlice";
import { change } from "../features/controlSlice";
import { PropType } from "../types/PropType";
import { useTranslation } from "react-i18next";
type NewDataType = {
  id: number;
  name: string;
  gender: string;
  phoneNo: string;
  nationality: string;
};
type Prop = {
  nationality: PropType[];
  gender: PropType[];
  phoneCountry: PropType[];
};
function compareCharacter(a: string, b: string) {
  return ("" + a).localeCompare(b);
}

function DataTable({ nationality, gender, phoneCountry }: Prop) {
  const dispatch = useAppDispatch();
  const data = useAppSelector((store) => store.data);
  const [t] = useTranslation("global");
  const newData = data.map((value) => {
    return {
      id: value.id!,
      name: `${value.firstname} ${value.lastname}`,
      gender: gender.find((sex) => sex.value === value.gender)!.label,
      phoneNo: `${
        phoneCountry.find((country) => country.value === value.country)!.label
      }${value.phoneNo}`,
      nationality: nationality.find((nat) => nat.value === value.nationality)!
        .label,
    };
  });
  const [isCheck, setIsCheck] = useState<boolean>(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const itemRender: PaginationProps["itemRender"] = (
    _,
    type,
    originalElement
  ) => {
    if (type === "prev") {
      return <a>{t("table.prev")}</a>;
    }
    if (type === "next") {
      return <a>{t("table.next")}</a>;
    }
    return originalElement;
  };
  useEffect(
    function () {
      localStorage.setItem("data", JSON.stringify(data));
      console.log(data);
    },
    [data]
  );

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    newSelectedRowKeys.length === newData.length
      ? setIsCheck(true)
      : setIsCheck(false);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<NewDataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: "odd",
        text: "Select Odd Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: "even",
        text: "Select Even Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };

  function handleCheck<C extends CheckboxChangeEvent>(e: C) {
    setIsCheck((prev) => !prev);
    e.target.checked
      ? setSelectedRowKeys(newData.map((value) => value.id))
      : setSelectedRowKeys([]);
  }

  function handleRowDelete(id: number[] | React.Key[]) {
    dispatch(deleted(id));
    setSelectedRowKeys([]);
    setIsCheck(false);
  }

  function handleRowEdit(id: number) {
    const dataToEdited = data.find((value) => value.id === id);
    dispatch(change(dataToEdited));
  }

  const columns: TableColumnsType<NewDataType> = [
    {
      title: t("table.name"),
      dataIndex: "name",
      sorter: {
        compare: (a, b) => compareCharacter(a.name, b.name),
        multiple: 4,
      },
    },
    {
      title: t("form.gender"),
      dataIndex: "gender",
      sorter: {
        compare: (a, b) => compareCharacter(a.gender, b.gender),
        multiple: 3,
      },
    },
    {
      title: t("form.phoneNo"),
      dataIndex: "phoneNo",
      sorter: {
        compare: (a, b) => compareCharacter(a.phoneNo, b.phoneNo),
        multiple: 2,
      },
    },
    {
      title: t("form.nationality"),
      dataIndex: "nationality",
      sorter: {
        compare: (a, b) => compareCharacter(a.nationality, b.nationality),
        multiple: 1,
      },
    },
    {
      title: t("table.manage"),
      key: "id",
      render: (_, rec) => (
        <Flex gap="small" wrap>
          <Button
            type="link"
            size="small"
            onClick={() => handleRowEdit(rec.id)}
          >
            {t("table.edit")}
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => handleRowDelete([rec.id])}
          >
            {t("table.delete")}
          </Button>
        </Flex>
      ),
    },
  ];

  return (
    <>
      <Flex vertical gap="small">
        <div>
          <Checkbox
            checked={isCheck}
            defaultChecked={isCheck}
            onChange={(e) => handleCheck(e)}
          >
            {t("table.selectall")}
          </Checkbox>
          <Button
            htmlType="button"
            onClick={() => handleRowDelete(selectedRowKeys)}
          >
            {t("table.delete")}
          </Button>
        </div>
        <Table
          rowSelection={rowSelection}
          rowKey="id"
          columns={columns}
          dataSource={newData}
          pagination={{ position: ["topRight"], itemRender }}
        />
      </Flex>
    </>
  );
}

export default DataTable;
