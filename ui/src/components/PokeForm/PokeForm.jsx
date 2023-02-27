import React, { useEffect, useMemo } from "react";
import { shallow } from "zustand/shallow";
import { Box } from "@mui/system";
import { Container, IconButton } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/base/ClickAwayListener";
import toPairs from "lodash/toPairs";

import { useStore } from "../../state/store";
import { getFormActions, getFormState, useForm } from "../../state/form";
import { getActionStructure, withOverrides } from "./util";
import { usePortal } from "../../state/usePortal";

const HIDE_DISABLED_FIELDS = true;

export const PokeForm = ({ selectedPath, handleClose }) => {
  const {
    urbit,
    actions,
    ship,
    types: { FIELDS },
  } = usePortal();
  const { formAction, formData } = useForm(getFormState);
  const {
    setFormAction,
    setFormDataAtPath: setFormData,
    getFormDataAtPath: getFormData,
    setSkipInit,
  } = useForm(getFormActions);

  useEffect(() => {
    if (ship?.length) setFormData("ship", `~${ship}`);
    if (formAction.length && !formData?.actionType?.length) {
      setFormData("actionType", formAction);
    }
    return () => {
      setSkipInit(false);
    };
  }, [ship]);

  const fields = useMemo(
    () => FIELDS[formAction]?.fields || [],
    [FIELDS, formAction, ship]
  );

  const handleChange = (name, value, parent) =>
    setFormData(formatPath(name, parent), value);

  const handleSetAction = action => {
    setFormAction(action);
    setFormData("actionType", action);
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    const [predicate, noun] = getActionStructure(formAction);

    actions[noun]?.pokes[predicate?.toLowerCase()](
      urbit,
      actions[noun][predicate]
    )(withOverrides(formData, {}));
  };

  // TODO: Align styling with other components
  const createInputComponents = (fieldsByAction, handleChange) => {
    return action =>
      fieldsByAction.length ? (
        <GenericFieldMapper
          fields={fields}
          formData={formData}
          action={action}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      ) : (
        <Box>
          <Typography variant="body1">No fields found for {action}</Typography>
        </Box>
      );
  };

  const generateInputComponents = createInputComponents(fields, handleChange);

  const onClickAway = evt => {
    setSkipInit(false);
    handleClose(evt);
  };
  const getActionOptions = fields =>
    toPairs(fields).map(([key, val]) => (
      <option key={key} value={key}>
        {val.heading}
      </option>
    ));

  return (
    <ClickAwayListener onClickAway={onClickAway}>
      <Container sx={{ m: 1, gap: "2px" }}>
        <Box>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel htmlFor="gen-form-action">Action: </InputLabel>
            <Select
              native
              value={formAction}
              onChange={event => handleSetAction(event.target.value)}
              input={<OutlinedInput label="Action" id="gen-form-action" />}
            >
              {FIELDS && getActionOptions(FIELDS)}
            </Select>
          </FormControl>

          {formAction && formData && generateInputComponents(formAction)}
          <Button onClick={handleSubmit}>Submit</Button>
          <Button
            onClick={evt => {
              evt.preventDefault();
              setSkipInit(false);
              handleClose(evt);
            }}
          >
            Exit
          </Button>
        </Box>
      </Container>
    </ClickAwayListener>
  );
};

// TODO: Move these components to their own file(s)
export const GenericTextField = ({
  field,
  formData,
  action,
  addProps,
  handleChange,
  handleSubmit,
}) => {
  const getFieldShallow = useForm(state => state.getFormDataAtPath, shallow);
  const setField = useForm(state => state.setFormDataAtPath);
  return !field.disabled ? (
    <TextField
      id={`gen-form-action-${action}`}
      label={field.label}
      // placeholder={getPathDefaults(field)}
      value={getFieldShallow(formatPath(field.name, field.parent))}
      onKeyDown={evt => {
        if (evt.key === "Enter") {
          handleSubmit(evt);
        }
      }}
      onChange={evt => setField(formatPath(field.name, field.parent), evt.target.value)}
      {...addProps}
      sx={{ m: 1, minWidth: 120, gap: "2px" }}
    ></TextField>
  ) : null;
};

export const GenericFieldMapper = ({
  fields,
  formData,
  action,
  handleChange,
  handleSubmit,
}) => {
  return fields.map(field =>
    field.children?.length ? (
      <Box key={field.name}>
        <InputLabel id={`gen-form-action-${action}-label`}>{field.name}</InputLabel>
        {field.children.map(child => (
          <GenericTextField
            key={child.name}
            field={child}
            formData={formData}
            action={action}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        ))}
      </Box>
    ) : (
      <GenericTextField
        field={field}
        formData={formData}
        action={action}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    )
  );
};

// TODO: Move to util
export const formatPath = (_name, _parent) => (_parent ? `${_parent}.${_name}` : _name);
