import { Button, DatePicker, Flex, Form, Input, Radio, Select } from "antd";
import { useAppDispatch, useAppSelector } from "../hook";
import { change, reset } from "../features/controlSlice";
import { submit } from "../features/dataSlice";
import dayjs from "dayjs";
import { useEffect } from "react";
import { DataType } from "../types/DataType";
import { PropType } from "../types/PropType";
import { useTranslation } from "react-i18next";
type Prop = {
  title: PropType[];
  nationality: PropType[];
  gender: PropType[];
  phoneCountry: PropType[];
};
function DataForm({ title, nationality, gender, phoneCountry }: Prop) {
  const dispatch = useAppDispatch();
  const controlData = useAppSelector((store) => store.controlState);
  const [form] = Form.useForm();
  const [t] = useTranslation("global");

  function handleChange(value: DataType) {
    dispatch(change(value));
  }

  function handleReset() {
    dispatch(reset());
  }

  function handleSubmit() {
    dispatch(submit(controlData));
    dispatch(reset());
  }

  useEffect(
    function () {
      form.setFieldsValue(controlData);
    },
    [controlData]
  );

  return (
    <Form
      onValuesChange={(changedValue) => handleChange(changedValue)}
      onFinish={() => handleSubmit()}
      form={form}
    >
      <Flex gap="small">
        <Form.Item
          label={t("form.title")}
          name="title"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <Select
            value={controlData.title}
            placeholder={t("form.title")}
            style={{ width: 100 }}
            options={title}
          />
        </Form.Item>
        <Form.Item
          label={t("form.firstname")}
          name="firstname"
          htmlFor="firstname"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <Input
            id="firstname"
            value={controlData.firstname!}
            style={{ width: "300px" }}
          />
        </Form.Item>
        <Form.Item
          label={t("form.lastname")}
          name="lastname"
          rules={[{ required: true, message: "Please input!" }]}
          htmlFor="lastname"
        >
          <Input
            id="lastname"
            value={controlData.lastname!}
            style={{ width: "300px" }}
          />
        </Form.Item>
      </Flex>
      <Flex gap="large">
        <Form.Item
          label={t("form.birthday")}
          name="birthday"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <DatePicker
            placeholder={t("form.format")}
            value={controlData.birthday}
            maxDate={dayjs(Date.now())}
          />
        </Form.Item>
        <Form.Item
          label={t("form.nationality")}
          name="nationality"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <Select
            value={controlData.nationality}
            placeholder={t("form.pleaseselect")}
            style={{ width: "300px" }}
            options={nationality}
          />
        </Form.Item>
      </Flex>
      <Form.Item label={t("form.citizenid")}>
        <Flex gap="small">
          <Form.Item name="citizen1" style={{ width: "75px" }}>
            <Input id="citizenid" maxLength={1} value={controlData.citizen1!} />
          </Form.Item>
          <div>-</div>
          <Form.Item name="citizen2" style={{ width: "225px" }}>
            <Input maxLength={4} value={controlData.citizen2!} />
          </Form.Item>
          <div>-</div>
          <Form.Item name="citizen3" style={{ width: "225px" }}>
            <Input maxLength={5} value={controlData.citizen3!} />
          </Form.Item>
          <div>-</div>
          <Form.Item name="citizen4" style={{ width: "150px" }}>
            <Input maxLength={2} value={controlData.citizen4!} />
          </Form.Item>
          <div>-</div>
          <Form.Item name="citizen5" style={{ width: "75px" }}>
            <Input maxLength={1} value={controlData.citizen5!} />
          </Form.Item>
        </Flex>
      </Form.Item>
      <Form.Item
        label={t("form.gender")}
        name="gender"
        rules={[{ required: true, message: "Please input!" }]}
      >
        <Radio.Group options={gender} value={controlData.gender}></Radio.Group>
      </Form.Item>
      <Form.Item label={t("form.phoneNo")} required>
        <Flex gap="middle">
          <Form.Item
            name="country"
            style={{ display: "inline-block" }}
            rules={[{ required: true, message: "Please input!" }]}
          >
            <Select
              value={controlData.country}
              style={{ width: 100 }}
              options={phoneCountry}
            />
          </Form.Item>
          <div>-</div>
          <Form.Item
            name="phoneNo"
            style={{ display: "inline-block" }}
            rules={[{ required: true, message: "Please input!" }]}
          >
            <Input style={{ width: "300px" }} value={controlData.phoneNo!} />
          </Form.Item>
        </Flex>
      </Form.Item>
      <Form.Item
        label={t("form.passport")}
        name={"passportNo"}
        htmlFor="passport"
      >
        <Input
          id="passport"
          style={{ width: "433px" }}
          value={controlData.passportNo!}
        />
      </Form.Item>
      <Flex justify="space-between">
        <Form.Item
          label={t("form.salary")}
          name="salary"
          htmlFor="salary"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <Input
            id="salary"
            style={{ width: "400px" }}
            value={controlData.salary!}
          />
        </Form.Item>
        <Flex gap="large">
          <Button block htmlType="reset" onClick={handleReset}>
            {t("form.reset")}
          </Button>
          <Button block htmlType="submit">
            {t("form.submit")}
          </Button>
        </Flex>
      </Flex>
    </Form>
  );
}

export default DataForm;
