import React, { useState, useEffect } from 'react';

import { FiPlus, FiClipboard, FiUser } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import api from '../../services/api';

import Bookshelf from '../../assets/bookshelf.png';

import {
  Container,
  Left,
  ImageContainer,
  Right,
  NewButton,
  InputContainer,
  Input,
  FormContainer,
  FormContainerHeader,
  Content,
  BooksListFooter,
} from './styles';

import { IBook } from '../Home';
import Form from '../../components/Form';

interface IState {
  book: IBook;
}

const Home = () => {
  const [id, setId] = useState<number | null>(null);

  const { register, handleSubmit, errors, setValue, getValues } = useForm<
    Omit<IBook, 'id'>
  >();

  const history = useHistory();

  const schema = Yup.object().shape({
    title: Yup.string().required(),
    author: Yup.string().required(),
    status: Yup.string().required(),
  });

  useEffect(() => {
    const book = (history?.location?.state as IState)?.book;

    if (book !== null) {
      if ('id' in book) {
        setId(book.id);
      }

      setValue('title', book?.title);
      setValue('author', book?.author);
      setValue('status', book?.status);
    }
  }, [history.location.state, setValue]);

  const onSubmit = async ({ title, author, status }: Omit<IBook, 'id'>) => {
    const data = {
      title,
      author,
      status,
    };

    if (id) {
      await api.put(`/books/${id}`, data);
    } else {
      await api.post('/books', data);
    }

    history.push('/');
  };

  return (
    <Container>
      <Left>
        <h1>
          My
          <br />
          Book
          <br />
          Shelf
        </h1>
        <ImageContainer>
          <img src={Bookshelf} alt="Bookshelf" />
        </ImageContainer>
      </Left>
      <Right>
        <FormContainer>
          <FormContainerHeader>
            <h3>{id ? getValues('title') : 'Novo livro'}</h3>
          </FormContainerHeader>
          <Form onSubmit={handleSubmit(onSubmit)} schema={schema}>
            <Content>
              <InputContainer>
                <Input name="title" placeholder="Título" ref={register} />
                <div>
                  <FiClipboard size={20} color="#BDBDBD" />
                </div>
              </InputContainer>
              <InputContainer>
                <Input name="author" placeholder="Autor" ref={register} />
                <div>
                  <FiUser size={20} color="#BDBDBD" />
                </div>
              </InputContainer>
              <InputContainer>
                <Input name="status" placeholder="Status" ref={register} />
                <div>
                  <FiUser size={20} color="#BDBDBD" />
                </div>
              </InputContainer>
            </Content>
            <BooksListFooter>
              <NewButton type="submit">
                {id ? 'Editar' : 'Novo'}
                <FiPlus size={20} color="#fff" />
              </NewButton>
            </BooksListFooter>
          </Form>
        </FormContainer>
      </Right>
    </Container>
  );
};

export default Home;
