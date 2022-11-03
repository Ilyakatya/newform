import { useFieldArray, useForm } from "react-hook-form";

// let's try to use scss, not css
import "./styles.css";

// Now create separate folder called 'components' inside and create here folder 'CompanyForm'
// Also import this form to the App and show it in the application

export default function App() {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
    control
  } = useForm({
    defaultValues: {
      // we don't need id here
      companies: [{ id: "0", value: "" }]
    },
    mode: "onBlur"
  });

  const { fields, append, remove } = useFieldArray({
    control,
    // I think it should be 'employees'
    name: "companies",
    mode: "onBlur"
  });

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  return (
    // I prefer to use 'container' naming
    <div className="bg-company">
      {/* please, don't use uppercase for the classes. It's better to rename it as form-container or form-wrapper */}
      <div className="Formstate">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* also wrong naming. Form is the whole form. Here is better like form-item */}
          <div className="company-form">
          {/* need spacing for the children components */}
          <label>
            <p>Company name</p>
            <input
              type="text"
              // value should be name or companyName (it's a camelCase word styling)
              {...register("companyname", {
                pattern: {
                  value: /^[A-z]/,
                  // It's better to show another message like 'Name isn't correct or something like that
                  message: "Error"
                },
                required: "Required"
              })}
            />
          </label>
          </div>
          <div style={{ height: 40 }}>
            {/* change companyname */}
            {errors?.companyname && (
              // better to use another text like 'Company name should contains only letters'
              <p>{errors?.companyname.message || "Only letters"}</p>
            )}
          </div>
          {/* same as below. Wrong logical naming */}
          <div className="company-form">
          <label>
            <p>Company email</p>
            <input
              type="email"
              // same as below. not companyemail but email or companyEmail
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
              // use another error message
              <p>{errors?.companyemail.message || "Error"}</p>
            )}
          </div>
          {/* same, change className naming */}
          <div className="company-form">   
          <label>
            <p>City</p>
            <input
              type="text"
              // not companycity but city or companyCity
              {...register("companycity", {
                pattern: {
                  value: /^[A-z]/,
                  // another error message
                  message: "Error"
                },
                required: "Required"
              })}
            />
          </label>
          </div>
          <div style={{ height: 40 }}>
            {errors?.companycity && (
              // same as below, another error message
              // also it's better to style this message, to add like color: red or something like that
              <p>{errors?.companycity.message || "Only letters"}</p>
            )}
          </div>
          {/* className naming */}
          <div className="company-form">  
          <label>
            <p>Country</p>
            <input
              type="text"
              // same as below
              {...register("companycountry", {
                pattern: {
                  value: /^[A-z]/,
                  // error message
                  message: "Error"
                },
                required: "Required"
              })}
            />
          </label>
          </div>
          <div style={{ height: 40 }}>
            {errors?.companycountry && (
              // error message
              <p>{errors?.companycountry.message || "Only letters"}</p>
            )}
          </div>
          {/* same as below */}
          <div className="company-form">     
          <label>
            <p> Phone number </p>
            <input
              type="number"
              // same as below
              {...register("companynumber", {
                pattern: {
                  value: "/[^0-9]/",
                  // message
                  message: "Error"
                },
                required: "Required"
              })}
            />
          </label>
          </div>
          {/*  Did you recognize that this div with style height: 40 is repeating? Maybe we should create a className for example form-error and add styling to it?  */}
          <div style={{ height: 40 }}>
            {errors?.companynumber && (
              // message
              <p>{errors?.companynumber.message || "Only numbers"}</p>
            )}
          </div>
              
          <ul>
            <p className="company__employees">Employees</p>
            {fields.map((item, index) => {
              return (
                // it's better to add className here and pass styles with className
                <li key={item.id}>
                  <input
                    type="text"
                    // not companies but employees
                    name={`companies[${index}].value`}
                    defaultValue={item.value}
                    // not companies but employees
                    {...register(`companies[${index}].value`, {
                      pattern: {
                        value: "/^[A-z]/",
                        // message
                        message: "Error"
                      },
                      required: "Required"
                    })}
                  /> 
                  {/* chose another className */}
                  <div className="company__delete-btn">
                    {/* spacing and you can add that className to button, no need to use parent div */}
                  <button onClick={() => remove(index)}>Delete</button>
                  </div>
                </li>
              );
            })}
          </ul>
          <div style={{ height: 40 }}>
            {errors?.companies && (
              // message
              <p>{errors?.companies.message || "Only letters"}</p>
            )}
          </div>
          {/* you don't need here section */}
          <section>
            {/* not company but employees */}
            {/* also spacing */}
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
            {/* spacing */}
          <button disabled={!isValid}>Send</button>
          </div>
        </form>
      </div>
    </div>
    );
  }
