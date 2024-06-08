import React, { useState, useEffect } from "react";
import { Button, Input, Space, Form } from "antd";
import { useRouter } from "next/router";

interface DomainInputProps {
  onDomainSubmit: (domain: string) => void;
  initialDomain?: string;
}

export default function DomainInput({
  onDomainSubmit,
  initialDomain = "",
}: DomainInputProps) {
  const [domain, setDomain] = useState<string>(initialDomain);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (domain.trim() !== "") {
      onDomainSubmit(domain);
      router.push(`/${domain}`);
      console.log(domain);
    } else {
      console.log("Пожалуйста, введите домен");
    }
  };

  useEffect(() => {
    setDomain(initialDomain);
  }, [initialDomain]);

  return (
    <div className="form">
      <form onSubmit={handleSubmit} className="form__form">
        <Space className="form__box" direction="vertical">
          <Form.Item className="form__item">
            <Input
              allowClear
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="Введите доменное имя"
              className="form__input"
            />
            <label className="form__label">Проверить SSL</label>
          </Form.Item>
          <Button htmlType="submit" className="form__btn">
            Проверить
          </Button>
        </Space>
      </form>
    </div>
  );
}
