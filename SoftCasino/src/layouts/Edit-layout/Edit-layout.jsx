import Edit from "../../components/Edit/Edit";
import useRouteGuard from "../../hooks/useRouteGuard";

import styles from "./Edit-layout-styles.module.css";

export default function EditLayout({showAside}) {
  let showAsideClass = {};
  if (showAside) {
    showAsideClass.opacity = "0.3";
    showAsideClass.pointerEvents = "none";
  }

  useRouteGuard();
  return (
    <section style={showAsideClass} className={styles["main-profile-edit-wrapper"]}>
      <div className={styles["profile-edit-wrapper"]}>
        <div className={styles["edit-form-wrapper"]}>
          <Edit
            forId1="username1"
            inputId1="username1"
            forId2="username2"
            inputId2="username2"
            EditText="Change username"
            input1Type="text"
            input1Text="New username"
            input2Type="password"
            input2Text="Current password"
            BtnText="Edit"
            secondInput={true}
            setting="username"
          ></Edit>
        </div>
        <div className={styles["edit-form-wrapper"]}>
          <Edit
            forId1="password1"
            inputId1="password1"
            forId2="password2"
            inputId2="password2"
            EditText="Change password"
            input1Type="password"
            input1Text="Old password"
            input2Type="password"
            input2Text="New password"
            BtnText="Edit"
            secondInput={true}
            setting="password"
          ></Edit>
        </div>
        <div className={styles["edit-form-wrapper"]}>
          <Edit
            forId1="picture1"
            inputId1="picture1"
            forId2="picture2"
            inputId2="picture2"
            EditText="Change profile picture"
            input1Type="text"
            input1Text="URL"
            input2Type="password"
            input2Text="Current password"
            BtnText="Edit"
            secondInput={true}
            setting="url"
          ></Edit>
        </div>
        <div className={styles["edit-form-wrapper"]}>
          <Edit
            forId1="delUsername1"
            inputId1="delUsername1"
            forId2="delUsername2"
            inputId2="delUsername2"
            EditText="Delete account"
            input1Type="password"
            input1Text="Current password"
            BtnText="Delete"
            setting="delete"
          ></Edit>
        </div>
      </div>
    </section>
  );
}
