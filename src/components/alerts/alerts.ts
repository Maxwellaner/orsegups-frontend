import swal from 'sweetalert2';

type SwalProps = {
  text: string;
}

export const failAlert = ({ text }: SwalProps) => {
  swal.fire({
    position: 'top-end',
    toast: true,
    showConfirmButton: false,
    timer: 2000,
    icon: 'error',
    title: 'Oops...',
    text
  })
}

export const successAlert = ({ text }: SwalProps) => {
  return swal.fire({
    position: 'top-end',
    toast: true,
    showConfirmButton: false,
    timer: 2000,
    icon: 'success',
    title: 'Tudo certo!',
    text
  });
}
