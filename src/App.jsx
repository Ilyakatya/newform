import { useFieldArray, useForm } from "react-hook-form";

import "./styles.css";

export default function App() {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
    control
  } = useForm({
    defaultValues: {
      companies: [{ id: "0", value: "" }]
    },
    mode: "onBlur"
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "companies",
    mode: "onBlur"
  });

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  return (
    <div className="bg-company">
      <div className="Formstate">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="company-form">
          <label>
            <p>Company name</p>
            <input
              type="text"
              {...register("companyname", {
                pattern: {
                  value: /^[A-z]/,
                  message: "Error"
                },
                required: "Required"
              })}
            />
          </label>
          </div>
          <div style={{ height: 40 }}>
            {errors?.companyname && (
              <p>{errors?.companyname.message || "Only letters"}</p>
            )}
          </div>
          <div className="company-form">
          <label>
            <p>Company email</p>
            <input
              type="email"
              {...register("companyemail", {
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Email is not valid"
                },
                required: "Required"
              })}
            />
          </label>
          </div>
          <div style={{ height: 40 }}>
            {errors?.companyemail && (
              <p>{errors?.companyemail.message || "Error"}</p>
            )}
          </div>
          <div className="company-form">   
          <label>
            <p>City</p>
            <input
              type="text"
              {...register("companycity", {
                pattern: {
                  value: /^[A-z]/,
                  message: "Error"
                },
                required: "Required"
              })}
            />
          </label>
          </div>
          <div style={{ height: 40 }}>
            {errors?.companycity && (
              <p>{errors?.companycity.message || "Only letters"}</p>
            )}
          </div>
          <div className="company-form">  
          <label>
            <p>Country</p>
            <input
              type="text"
              {...register("companycountry", {
                pattern: {
                  value: /^[A-z]/,
                  message: "Error"
                },
                required: "Required"
              })}
            />
          </label>
          </div>
          <div style={{ height: 40 }}>
            {errors?.companycountry && (
              <p>{errors?.companycountry.message || "Only letters"}</p>
            )}
          </div>
          <div className="company-form">     
          <label>
            <p> Phone number </p>
            <input
              type="number"
              {...register("companynumber", {
                pattern: {
                  value: "/[^0-9]/",
                  message: "Error"
                },
                required: "Required"
              })}
            />
          </label>
          </div>
          <div style={{ height: 40 }}>
            {errors?.companynumber && (
              <p>{errors?.companynumber.message || "Only numbers"}</p>
            )}
          </div>
              
          <ul>
            <p className="company__employees">Employees</p>
            {fields.map((item, index) => {
              return (
                <li key={item.id}>
                  <input
                    type="text"
                    name={`companies[${index}].value`}
                    defaultValue={item.value}
                    {...register(`companies[${index}].value`, {
                      pattern: {
                        value: "/^[A-z]/",
                        message: "Error"
                      },
                      required: "Required"
                    })}
                  /> 
                  <div className="company__delete-btn">
                  <button onClick={() => remove(index)}>Delete</button>
                  </div>
                </li>
              );
            })}
          </ul>
          <div style={{ height: 40 }}>
            {errors?.companies && (
              <p>{errors?.companies.message || "Only letters"}</p>
            )}
          </div>
          <section>
          <div className="company-button"> 
            <button
              type="button"
              onClick={() => {
                append({ value: "" });
              }}
            >
              Add
            </button>
            </div>
          </section>
          <div className="company-button">
          <button disabled={!isValid}>Send</button>
          </div>
        </form>
      </div>
    </div>
    );
  }
