import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import emailjs from "@emailjs/browser";
import { useState } from "react";
import Input from "../input";
import ButtonComponent from "../button";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { formSchema, FormSchema } from "../../schemas/forms";

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    defaultValues: { services: [] },
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormSchema) => {
    if (Object.keys(errors).length > 0) {
      toast.error(Object.values(errors)[0]?.message as string, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Bounce,
      });
      return;
    }

    setLoading(true);
    try {
      const response = await emailjs.send(
        "service_lf5pj8z",
        "contact_form",
        {
          from_name: data.name,
          company: data.company,
          email: data.email,
          phone: data.phone,
          services: data.services.join(", "),
          message: data.message || "Sem mensagem",
        },
        "eigy8G7prjODn5kms"
      );

      if (response.status === 200) {
        toast.success("Mensagem enviada com sucesso!");
        setValue("name", "");
        setValue("company", "");
        setValue("email", "");
        setValue("phone", "");
        setValue("services", []);
        setValue("message", "");
      } else {
        throw new Error("Erro ao enviar o formulário.");
      }
    } catch (error) {
      toast.error("Erro ao enviar a mensagem. Tente novamente.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Bounce,
      });
      console.error("Erro ao enviar e-mail:", error);
    }

    setLoading(false);
  };

  return (
    <section
      id="contact"
      className="p-6 sm:p-10 lg:p-30 bg-darkBlue text-white flex flex-col lg:flex-row justify-center gap-8"
    >
      <div className="w-full lg:w-1/3 font-display flex flex-col gap-10 text-center lg:text-left">
        <h2 className="text-3xl lg:text-4xl font-black">
          Vamos tirar sua ideia do papel?
        </h2>
        <p className="text-lg lg:text-xl font-semibold">
          Entre em contato e descubra como podemos transformar seu projeto em
          realidade!
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-black text-white rounded-3xl w-full lg:w-1/2 p-6 sm:p-10 flex flex-col gap-6"
      >
        <div className="flex sm:flex-row gap-4">
          <div className="flex flex-col gap-4 w-full sm:w-2/3">
            <Input
              label="Nome"
              type="text"
              placeholder="Digite seu nome"
              register={register("name")}
              errorMessage={errors.name ? errors.name?.message : undefined}
              required
            />
            <Input
              label="Nome da empresa"
              type="text"
              placeholder="Digite o nome da empresa"
              register={register("company")}
              errorMessage={
                errors.company ? errors.company?.message : undefined
              }
              required
            />
            <Input
              label="Email"
              type="email"
              placeholder="Digite seu email"
              register={register("email")}
              errorMessage={errors.email ? errors.email?.message : undefined}
              required
            />
            <Input
              label="Telefone"
              type="text"
              placeholder="DDD + Número"
              register={register("phone")}
              errorMessage={errors.phone ? errors.phone?.message : undefined}
              required
            />
          </div>

          <div className="mt-4">
            <label className="text-white font-medium">
              Quais serviços você precisa?
            </label>
            <Controller
              name="services"
              control={control}
              render={({ field }) => (
                <div className="flex flex-col flex-wrap gap-1">
                  {[
                    "Desenvolvimento de apps",
                    "Desenvolvimento de sites",
                    "E-commerce",
                    "APIs",
                    "Software personalizado",
                    "Manutenção de sites",
                    "Manutenção de apps",
                  ].map((service) => (
                    <label
                      key={service}
                      className="flex text-sm items-center p-2 cursor-pointer rounded-md hover:bg-gray-700 transition"
                      htmlFor={service}
                    >
                      <input
                        id={service}
                        type="checkbox"
                        onChange={() => {
                          field.onChange(
                            field.value.includes(service)
                              ? field.value.filter((s: string) => s !== service)
                              : [...field.value, service]
                          );
                        }}
                        checked={field.value.includes(service)}
                        className="mr-2"
                      />
                      {service}
                    </label>
                  ))}
                </div>
              )}
            />
            {errors.services && (
              <span className="text-red-500 text-sm">
                {errors.services.message}
              </span>
            )}
          </div>
        </div>

        <div className="mt-4">
          <label className="text-white font-medium">
            Descreva seu problema:
          </label>
          <textarea
            placeholder="Descreva seu problema"
            rows={4}
            {...register("message")}
            className="w-full p-2 mt-2 rounded-lg bg-white text-black resize-none"
          />
          {errors.message && (
            <span className="text-red-500 text-sm">
              {errors.message.message}
            </span>
          )}
        </div>

        <ButtonComponent
          text={loading ? "Enviando..." : "Enviar"}
          className="bg-button w-full hover:bg-blue-600"
        />
      </form>
    </section>
  );
}
