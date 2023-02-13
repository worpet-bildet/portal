import React, { useEffect } from "react";
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
import { useForm } from "../../state/form";
import { getActionStructure, withOverrides } from "./util";
import { usePortal } from "../../state/usePortal";

const HIDE_DISABLED_FIELDS = true;

export const PokeForm = ({ selectedPath, handleClose }) => {
  const {
    urbit,
    actions,
    types: { FIELDS },
  } = usePortal();
  const {
    formAction,
    formData,
    setFormAction,
    setFormData,
    initFormData,
    skipInit,
    setSkipInit,
  } = useForm();
  // useEffect(() => {
  //   initFormData(getInitialFormData());
  //   return () => { setSkipInit(false) };
  // }, [itemPreviewPath]);

  const getValue = (field, _formData) => _formData[field.name];
  const handleChange = (name, value) => setFormData(name, value);
  const handleSetAction = action => setFormAction(action);

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
    return action => {
      const fields = fieldsByAction[action]?.fields || [];
      return fields.length
        ? fields.map(field => {
            const addProps = field.disabled ? { disabled: true } : {};
            return HIDE_DISABLED_FIELDS && field.disabled ? null : (
              <TextField
                key={field.name}
                id={`gen-form-action-${action}`}
                label={field.label}
                // placeholder={getPathDefaults(field)}
                value={getValue(field, formData)}
                onKeyDown={evt => {
                  if (evt.key === "Enter") {
                    handleSubmit(evt);
                    handleChange(field.name, "");
                  }
                }}
                onChange={evt => handleChange(field.name, evt.target.value)}
                {...addProps}
                sx={{ m: 1, minWidth: 120, gap: "2px" }}
              ></TextField>
            );
          })
        : null;
    };
  };
  const generateInputComponents = createInputComponents(FIELDS, handleChange);
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
