import { MdEmail, MdLock, MdPerson} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";

import { api } from "../../services/api";

import {
  Column,
  Container,
  FazerLogin,
  // EsqueciText,
  Row,
  SubtitleLogin,
  Title,
  TitleLogin,
  Wrapper,
} from "./styles";
import { IFormData } from "./types";

const schema = yup
  .object({
    email: yup
      .string()
      .email("email não é valido")
      .required("Campo obrigatório"),
    password: yup
      .string()
      .min(3, "No minimo 3 caracteres")
      .required("Campo obrigatório"),
  })
  .required();

const Login = () => {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = async (formData: IFormData) => {
    try {
      const { data } = await api.get(
        `users?email=${formData.email}&senha=${formData.password}`
      );
      if (data.length === 1) {
        navigate("/feed");
      } else {
        alert("Email ou senha inválido");
      }
    } catch {
      alert("Houve um erro, tente novamente.");
    }
  };

  return (
    <>
      <Header />
      <Container>
        <Column>
          <Title>
            A plataforma para você aprender com experts, dominar as principais
            tecnologias e entrar mais rápido nas empresas mais desejadas.
          </Title>
        </Column>
        <Column>
          <Wrapper>
            <TitleLogin>Começe agora grátis</TitleLogin>
            <SubtitleLogin>Crie a sua conta e make the change.</SubtitleLogin>
            <form onSubmit={handleSubmit(onSubmit)}>
            <Input
                name="name"
                errorMessage={errors?.email?.message}
                control={control}
                placeholder="Nome completo"
                leftIcon={<MdPerson />}
              />
              <Input
                name="email"
                errorMessage={errors?.email?.message}
                control={control}
                placeholder="E-mail"
                leftIcon={<MdEmail />}
              />
              <Input
                name="password"
                errorMessage={errors?.password?.message}
                control={control}
                placeholder="Senha"
                type="password"
                leftIcon={<MdLock />}
              />
              <Button title="Criar minha conta" variant="secondary" type="submit" />
            </form>
            <Row>
            <SubtitleLogin>Ao clicar em "Criar minha conta grátis", declaro que aceito as Políticas de Privacidade e os termos de Uso da DIO.<br></br>
            <p>Já tenho conta</p><FazerLogin>Fazer login</FazerLogin> 
           
            </SubtitleLogin>
            </Row>
          </Wrapper>
        </Column>
      </Container>
    </>
  );
};

export { Login };
